use axum::{
    http::{header::{self, ACCESS_CONTROL_ALLOW_HEADERS}, Method, Request, Response, StatusCode, Uri},
    response::IntoResponse,
    routing::{get, post},
    Router, Server,
};

use tower_http::cors::{Any, CorsLayer};

use std::{env, net::SocketAddr, time::Duration};
use tower::{timeout::TimeoutLayer, Layer, ServiceBuilder};
use tower_http::trace::TraceLayer;
use tracing::{debug, error, info};
use tracing_subscriber::fmt::Subscriber;

use crate::{api, repository};

pub async fn start(db: repository::mongodb_repo::MongoRepo) {
    let subscriber = Subscriber::new();
    tracing::subscriber::with_default(subscriber, || {
        tracing_subscriber::fmt::init();
    });

    let server_addr: String = env::var("SERVER").expect("Define server=host:port");
    let server_addr: SocketAddr = server_addr
        .parse()
        .expect("Define SERVER=host:port in your .env");

    info!("Launching server: http://{server_addr}/");

    let cors = CorsLayer::new()
        // allow `GET` and `POST` when accessing the resource
        .allow_methods([Method::GET, Method::POST])
        // allow requests from any origin
        .allow_origin(Any)
        // allow access control headers
        .allow_headers([ACCESS_CONTROL_ALLOW_HEADERS]);
    

    let app = Router::new()
        .route("/", get(|| async { "Carbon Trading Simulation" }))
        .route("/health", get(api::health::get))
        .route("/users", get(api::users::list))
        .route("/users/:id", get(api::users::get))
        .route("/users/create", post(api::users::create))
        .route("/transactions", get(api::transactions::list))
        .route("/transactions/:id", get(api::transactions::get))
        .route("/transactions/transfer", post(api::transactions::transfer))
        .with_state(db)
        .layer(ServiceBuilder::new().layer(TraceLayer::new_for_http()))
        .layer(cors)
        .fallback(fallback_handler);

    Server::bind(&server_addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[tracing::instrument]
async fn fallback_handler(uri: Uri) -> impl IntoResponse {
    (StatusCode::NOT_FOUND, format!("No route for {}", uri))
}
