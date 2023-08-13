use mongodb::bson::oid::ObjectId;
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Transaction {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub id: Option<ObjectId>,
    pub sender: String,
    pub receiver: String,
    pub amount: f64,
    pub transaction_type: Option<TransactionType>,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum TransactionType {
    Buy,
    Sell,
    Transfer,
}