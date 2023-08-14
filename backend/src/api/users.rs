use crate::{models::user::User, repository::mongodb_repo::MongoRepo};
/// This module defines the API endpoints for users.
use axum::extract::Path;
use axum::{extract::State, http::StatusCode, Json};
use tracing::debug;

use super::api_error;
use api_error::ApiErrorResponse;

/// This endpoint creates a new user from a given json with user details.
///
/// Returns new object idea if user is created successfully.
pub async fn create(
    State(db): State<MongoRepo>,
    new_user: Json<User>,
) -> Result<Json<String>, ApiErrorResponse> {
    debug!("Creating new user");
    let data = User {
        id: None,
        name: new_user.name.to_owned(),
        user_id: new_user.user_id.to_owned(),
        balance: new_user.balance,
    };

    let user_detail = db.create_user(data);

    match user_detail.await {
        Ok(user) => Ok(Json(user)),
        Err(err) => Err(ApiErrorResponse {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error_message: err.to_string(),
        }),
    }
}

/// This endpoint retrieves the details of a user by ID.
///
/// The `id` path parameter must be a non-empty string.
pub async fn get(
    State(db): State<MongoRepo>,
    Path(id): Path<String>,
) -> Result<Json<User>, ApiErrorResponse> {
    debug!("Retrieving user details for id {}", id);

    if id.is_empty() {
        return Err(ApiErrorResponse {
            code: StatusCode::BAD_REQUEST,
            error_message: "ID cannot be empty".to_string(),
        });
    }

    match db.get_user(&id).await {
        Ok(Some(user)) => Ok(Json(user)),
        Ok(None) => Err(ApiErrorResponse {
            code: StatusCode::BAD_REQUEST,
            error_message: format!("User with ID {} not found", id),
        }),
        Err(err) => Err(ApiErrorResponse {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error_message: err.to_string(),
        }),
    }
}

/// This endpoint retrieves all users.
/// TODO: impelement pagination
pub async fn list(State(db): State<MongoRepo>) -> Result<Json<Vec<User>>, ApiErrorResponse> {
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
        Err(err) => Err(ApiErrorResponse {
            code: StatusCode::INTERNAL_SERVER_ERROR,
            error_message: err.to_string(),
        }),
    }
}
