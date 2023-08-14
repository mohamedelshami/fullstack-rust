use tracing::info;

mod api;
mod models;
mod repository;
mod server;

use repository::mongodb_repo::MongoRepo;

#[tokio::main]
async fn main() {
    dotenv::from_path(".env").ok(); // Don't fail if .env is not provided, instead source env from the host environment

    let db = MongoRepo::init();
    let db = db.await;

    info!("Connected to MongoDB!");

    server::axum_server::start(db).await;
}