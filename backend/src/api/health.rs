use axum::http::StatusCode;
use tracing::info;

#[tracing::instrument]
pub async fn get() -> StatusCode {
    info!("Server health status requested");
    StatusCode::OK
}
