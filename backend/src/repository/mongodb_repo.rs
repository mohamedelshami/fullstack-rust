use std::env;
extern crate dotenv;

use dotenv::dotenv;

use mongodb::{
    bson::{doc, oid::ObjectId},
    error::Error,
    options::IndexOptions,
    results::InsertOneResult,
    Client, Collection, IndexModel,
};

use crate::models::user::User;
use crate::models::transaction::Transaction;

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

        let model = IndexModel::builder()
            .keys(doc! { "user_id": 1 })
            .options(IndexOptions::builder().unique(true).build())
            .build();

        let user_col = db.collection("User");

        user_col
            .create_index(model, None)
            .await
            .expect("Error creating index for user_id");

        MongoRepo {
            user_collection: user_col,
            transaction_collection: db.collection("Transaction"),
        }
    }

    pub async fn create_user(&self, new_user: User) -> Result<String, Error> {
        let new_doc = User {
            id: None,
            name: new_user.name,
            user_id: new_user.user_id,
            balance: new_user.balance,
        };

        let result = self.user_collection.insert_one(new_doc, None).await?;

        match result.inserted_id {
            mongodb::bson::Bson::ObjectId(oid) => {
                Ok(oid.to_string())
            }
            _ => Err(Error::custom("Error creating user")),
        }
     
    }

    pub async fn get_user(&self, user_id: &String) -> Result<Option<User>, Error> {
        let user_detail = self
            .user_collection
            .find_one(doc! { "user_id": user_id,}, None)
            .await?;

        Ok(user_detail)
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
        let tx_detail = self.transaction_collection.find_one(filter, None).await?;

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
            .await?;

        session.start_transaction(None).await?;

        let sender_id = new_doc.sender.clone();

        let sender_filter = doc! { "user_id": new_doc.sender.clone() };
        let receiver_filter = doc! { "user_id": new_doc.receiver.clone() };

        let sender;
        match self.get_user(&sender_id).await {
            Ok(Some(user)) => {
                sender = user;
            }
            Ok(None) => {
                let _ = session.abort_transaction().await;
                return Err(Error::custom(format!("Sender id {} not found", sender_id)));
            }
            Err(e) => {
                let _ = session.abort_transaction().await;
                return Err(e);
            }
        }

        if sender.balance < new_doc.amount {
            // Insufficient funds, aborting the transaction
            let _ = session.abort_transaction().await;

            return Err(Error::custom(format!(
                "Transaction aborted insufficient balance for user {}",
                sender_id
            )));
        }

        // Deduct from sender balance
        let update_sender = doc! {
            "$inc": { "balance": -new_doc.amount }
        };

        self.user_collection
            .update_one(sender_filter, update_sender, None)
            .await?;

        // Add to receiver balance
        let update_receiver = doc! {
            "$inc": { "balance": new_doc.amount }
        };

        self.user_collection
            .update_one(receiver_filter, update_receiver, None)
            .await?;

        let tx = self
            .transaction_collection
            .insert_one(new_doc, None)
            .await?;

        session.commit_transaction().await?;

        Ok(tx)
    }
}
