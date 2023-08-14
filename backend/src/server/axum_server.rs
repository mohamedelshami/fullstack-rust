use axum::{
    http::{header::ACCESS_CONTROL_ALLOW_HEADERS, Method, StatusCode, Uri},
    response::IntoResponse,
    routing::{get, post},
    Router, Server,
};

use tower_http::cors::{Any, CorsLayer};

use std::{env, net::SocketAddr};
use tower::ServiceBuilder;
use tower_http::trace::TraceLayer;
use tracing::info;
use tracing_subscriber::fmt::Subscriber;

use crate::{api, repository};

pub async fn start(db: repository::mongodb_repo::MongoRepo) {
    // Create a tracing subscriber.
    let subscriber = Subscriber::new();

    // Initialize tracing with the subscriber.
    tracing::subscriber::with_default(subscriber, || {
        tracing_subscriber::fmt::init();
    });

    // Get the server address from the environment.
    let server_addr: String = env::var("SERVER").expect("Define server=host:port");
    let server_addr: SocketAddr = server_addr
        .parse()
        .expect("Define SERVER=host:port in your .env");

    info!("Launching server: http://{server_addr}/");

    // Create a CORS layer that allows `GET` and `POST` requests from any origin.
    let cors = CorsLayer::new()
        // allow `GET` and `POST` when accessing the resource
        .allow_methods([Method::GET, Method::POST])
        // allow requests from any origin
        .allow_origin(Any)
        // allow access control headers
        .allow_headers([ACCESS_CONTROL_ALLOW_HEADERS]);

    // Create a router with the following routes:
    // * `GET /`: Returns "Carbon Trading Simulation"
    // * `GET /health`: Returns the health status of the server
    // * `GET /users`: Returns a list of all users
    // * `GET /users/:id`: Returns a user by ID
    // * `POST /users/create`: Creates a new user
    // * `GET /transactions`: Returns a list of all transactions
    // * `GET /transactions/:id`: Returns a transaction by ID
    // * `POST /transactions/transfer`: Transfers funds between two users
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

    // Bind the server to the `server_addr` and start listening for requests.
    Server::bind(&server_addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[tracing::instrument]
async fn fallback_handler(uri: Uri) -> impl IntoResponse {
    (StatusCode::NOT_FOUND, format!("No route for {}", uri))
}
