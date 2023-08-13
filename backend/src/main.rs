use dotenv::dotenv;
use tracing::{debug, error, info};

mod api;
mod models;
mod repository;
mod server;

use repository::mongodb_repo::MongoRepo;

#[tokio::main]
async fn main() {
    dotenv().expect("Set your configuration in .env file");

    let db = MongoRepo::init();
    let db = db.await;

    info!("Connected to MongoDB!");

    server::axum_server::start(db).await;
}