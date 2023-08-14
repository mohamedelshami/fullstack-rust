use axum::extract::Path;
use axum::{extract::State, http::StatusCode, Json};
use mongodb::results::InsertOneResult;
use tracing::debug;

use crate::{
    models::transaction::Transaction, models::transaction::TransactionType,
    repository::mongodb_repo::MongoRepo,
};

use super::api_error;
use api_error::ApiErrorResponse;

pub async fn transfer(
    State(db): State<MongoRepo>,
    new_tx: Json<Transaction>,
) -> Result<Json<InsertOneResult>, ApiErrorResponse> {
    debug!("Transfer transaction");
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
        Err(err) => Err(ApiErrorResponse {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error_message: err.to_string(),
        }),
        // TODO: Implement custom server errors to handle custom error scenarios
        // Err(err) => match err.kind.as_ref() {
          //  ErrorKind::Custom { .. } => {}
    }
}

pub async fn get(
    State(db): State<MongoRepo>,
    Path(id): Path<String>,
) -> Result<Json<Transaction>, ApiErrorResponse> {
    debug!("Retreiving transaction details for id {}", id);

    if id.is_empty() {
        return Err(ApiErrorResponse {
            code: StatusCode::BAD_REQUEST,
            error_message: "ID cannot be empty".to_string(),
        });
    };

    let tx_detail = db.get_transaction(&id);

    match tx_detail.await {
        Ok(tx) => Ok(Json(tx)),
        Err(err) => Err(ApiErrorResponse {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error_message: err.to_string(),
        }),
    }
}

pub async fn list(State(db): State<MongoRepo>) -> Result<Json<Vec<Transaction>>, ApiErrorResponse> {
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
        Err(err) => Err(ApiErrorResponse {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error_message: err.to_string(),
        }),
    }
}
