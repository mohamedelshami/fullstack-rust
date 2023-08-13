use axum::extract::Path;
use axum::{extract::State, http::StatusCode, Json};
use mongodb::results::InsertOneResult;
use tracing::{debug, info};

use crate::{
    models::transaction::Transaction, models::transaction::TransactionType,
    repository::mongodb_repo::MongoRepo,
};

pub async fn transfer(
    State(db): State<MongoRepo>,
    new_tx: Json<Transaction>,
) -> Result<Json<InsertOneResult>, StatusCode> {
    let data: Transaction = Transaction {
        id: None,
        sender: new_tx.sender.to_owned(),
        receiver: new_tx.receiver.to_owned(),
        amount: new_tx.amount.to_owned(),
        transaction_type: Some(TransactionType::Transfer),
    };

    let tx_detail = db.create_transaction(data);

    match tx_detail.await {
        Ok(tx) => Ok(Json(tx)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn get(
    State(db): State<MongoRepo>,
    Path(id): Path<String>,
) -> Result<Json<Transaction>, StatusCode> {
    debug!("Retreiving transaction details for id {}", id);

    if id.is_empty() {
        return Err(StatusCode::BAD_REQUEST);
    };

    let tx_detail = db.get_transaction(&id);

    match tx_detail.await {
        Ok(tx) => Ok(Json(tx)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn list(
    State(db): State<MongoRepo>,
) -> Result<Json<Vec<Transaction>>, StatusCode> {
    debug!("Retrieving all user details");

    let transactions = db.get_all_transaction();

    match transactions.await {
        Ok(transaction_list) => {
            if transaction_list.is_empty() {
                Ok(Json(vec![]))
            } else {
                Ok(Json(transaction_list))
            }
        }
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}
