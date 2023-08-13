use crate::{models::user::User, repository::mongodb_repo::MongoRepo};
use axum::extract::Path;
use axum::{extract::State, http::StatusCode, Json};
use mongodb::results::InsertOneResult;
use tracing::debug;

pub async fn create(
    State(db): State<MongoRepo>,
    new_user: Json<User>,
) -> Result<Json<InsertOneResult>, StatusCode> {
    let data = User {
        id: None,
        name: new_user.name.to_owned(),
        user_id: new_user.user_id.to_owned(),
        balance: 100.0,
    };

    let user_detail = db.create_user(data);

    match user_detail.await {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn get(
    State(db): State<MongoRepo>,
    Path(id): Path<String>,
) -> Result<Json<User>, StatusCode> {
    debug!("Retreiving user details for id {}", id);

    if id.is_empty() {
        return Err(StatusCode::BAD_REQUEST);
    };

    let user_detail = db.get_user(&id);

    match user_detail.await {
        Ok(user) => Ok(Json(user)),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

pub async fn list(
    State(db): State<MongoRepo>,
) -> Result<Json<Vec<User>>, StatusCode> {
    debug!("Retrieving all user details");

    let users = db.get_all_users();

    match users.await {
        Ok(user_list) => {
            if user_list.is_empty() {
                Ok(Json(vec![]))
            } else {
                Ok(Json(user_list))
            }
        }
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}
