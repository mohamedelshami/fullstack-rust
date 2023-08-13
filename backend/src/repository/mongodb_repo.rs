use std::{env};
extern crate dotenv;

use dotenv::dotenv;

use mongodb::{
    bson::{doc, extjson::de::Error, oid::ObjectId},
    results::InsertOneResult,
    Client, Collection,
};

use crate::models::transaction::{Transaction, self};
use crate::models::user::User;

use futures::StreamExt;

#[derive(Clone)]
pub struct MongoRepo {
    user_collection: Collection<User>,
    transaction_collection: Collection<Transaction>,
}

impl MongoRepo {
    pub async fn init() -> Self {
        dotenv().ok();
        let uri = match env::var("MONGOURI") {
            Ok(v) => v.to_string(),
            Err(_) => format!("Error loading env variable"),
        };

        let client = Client::with_uri_str(uri).await.unwrap();
        let db = client.database("test");

        MongoRepo {
            user_collection: db.collection("User"),
            transaction_collection: db.collection("Transaction"),
        }
    }

    pub async fn create_user(&self, new_user: User) -> Result<InsertOneResult, Error> {
        let new_doc = User {
            id: None,
            name: new_user.name,
            user_id: new_user.user_id,
            balance: new_user.balance,
        };

        let user = self
            .user_collection
            .insert_one(new_doc, None)
            .await
            .ok()
            .expect("Error creating user");

        Ok(user)
    }

    pub async fn get_user_by_id(&self, id: &String) -> Result<User, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let user_detail = self
            .user_collection
            .find_one(filter, None)
            .await
            .ok()
            .expect("Error getting user's detail");
        Ok(user_detail.unwrap())
    }

    pub async fn get_user(&self, user_id: &String) -> Result<User, Error> {
        let user_detail = self
            .user_collection
            .find_one(doc! { "user_id": user_id,}, None)
            .await
            .ok()
            .expect("Error getting sender detail for user_id {}");

        Ok(user_detail.unwrap())
    }

    pub async fn get_all_users(&self) -> Result<Vec<User>, Error> {
        let mut cursor = self.user_collection.find(None, None).await.unwrap();
        let mut users: Vec<User> = Vec::new();

        while let Some(result) = cursor.next().await {
            users.push(result.unwrap());
        }

        Ok(users)
    }

    pub async fn get_transaction(&self, id: &String) -> Result<Transaction, Error> {
        let obj_id = ObjectId::parse_str(id).unwrap();
        let filter = doc! {"_id": obj_id};
        let tx_detail = self
            .transaction_collection
            .find_one(filter, None)
            .await
            .ok()
            .expect("Error getting sender detail for user_id {}");

        Ok(tx_detail.unwrap())
    }

    pub async fn get_all_transaction(&self) -> Result<Vec<Transaction>, Error> {
        let mut cursor = self.transaction_collection.find(None, None).await.unwrap();
        let mut transactions: Vec<Transaction> = Vec::new();

        while let Some(result) = cursor.next().await {
            transactions.push(result.unwrap());
        }

        Ok(transactions)
    }

    pub async fn create_transaction(&self, new_tx: Transaction) -> Result<InsertOneResult, Error> {
        let new_doc: Transaction = Transaction {
            id: None,
            sender: new_tx.sender,
            receiver: new_tx.receiver,
            amount: new_tx.amount,
            transaction_type: new_tx.transaction_type,
        };

        let mut session = self
            .transaction_collection
            .client()
            .start_session(None)
            .await
            .ok()
            .expect("Error starting MongoDB session");

        session
            .start_transaction(None)
            .await
            .ok()
            .expect("Error starting commit transaction");

        let sender_filter = doc! { "user_id": new_doc.sender.clone() };
        let receiver_filter = doc! { "user_id": new_doc.receiver.clone() };

        let sender = self
            .user_collection
            .find_one(sender_filter.clone(), None)
            .await
            .ok()
            .expect("Error getting sender detail for user_id {}");

        if let Some(sender_doc) = sender {
            if sender_doc.balance < new_doc.amount {
                // Insufficient funds, aborting the transaction
                let _ = session.abort_transaction().await;
                panic!(
                    "Transaction aborted insufficient balance for user {}",
                    sender_doc.user_id
                );
            }

            // Deduct from sender
            let update_sender = doc! {
                "$inc": { "balance": -new_doc.amount }
            };

            self.user_collection
                .update_one(sender_filter, update_sender, None)
                .await
                .ok()
                .expect(&format!(
                    "Error updating balance for user_id {}",
                    sender_doc.user_id
                ));

            // Add to receiver
            let update_receiver = doc! {
                "$inc": { "balance": new_doc.amount }
            };

            self.user_collection
                .update_one(receiver_filter, update_receiver, None)
                .await
                .ok()
                .expect(&format!(
                    "Error updating balance for user_id {}",
                    sender_doc.user_id
                ));
        }

        let tx = self
            .transaction_collection
            .insert_one(new_doc, None)
            .await
            .ok()
            .expect("Error creating transaction");

        session
            .commit_transaction()
            .await
            .ok()
            .expect("Commit transaction failed");

        Ok(tx)
    }
}
