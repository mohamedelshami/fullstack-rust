use axum::http::HeaderValue;
use axum::response::IntoResponse;
use axum::{http::StatusCode, response::Response};

/// This struct represents an error response for the API.
#[derive(Debug)]
pub struct ApiErrorResponse {
    /// The HTTP status code of the error response.
    pub code: StatusCode,
    /// The error message
    pub error_message: String,
}

impl IntoResponse for ApiErrorResponse {
    /// Converts the `ApiErrorResponse` struct into an `axum::Response`.
    fn into_response(self) -> Response {
        let status_code = self.code;
        let error_message = self.error_message;

        let body = axum::body::boxed(axum::body::Full::from(error_message));

        Response::builder()
            .status(status_code)
            .header("Content-Type", HeaderValue::from_static("application/json"))
            .body(body)
            .unwrap()
    }
}