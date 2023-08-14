use crate::models::user::User;
use mockall::{predicate::*, mock};
use mongodb::error::Error;

mock! {
    pub MongoRepo {
        async fn create_user(&self, new_user: User) -> Result<String, Error>;
        async fn get_user(&self, user_id: &String) -> Result<Option<User>, Error>;
        async fn get_all_users(&self) -> Result<Vec<User>, Error>;
    }
}

#[tokio::test]
async fn test_create() {
    let user = User {
        id: None,
        name: "Alice".to_owned(),
        user_id: "1234567890".to_owned(),
        balance: 1000.,
    };

    let mut mock_repo = MockMongoRepo::new();

    mock_repo
        .expect_create_user()
        .times(1)
        .withf(|u| u.name == "Alice")
        .returning(|_| {
            let result = "0".to_string();
            Ok(result)
        });

    mock_repo.create_user(user).await.unwrap();
}

#[tokio::test]
async fn test_get() {
    let user_id:String = "1".to_string();

    let mut mock_repo = MockMongoRepo::new();

    mock_repo
    .expect_get_user()
    .times(1)
    .withf(move |id| id == "1")
    .returning(|_| {
        let result = Option::Some(User {
            id: Some(bson::oid::ObjectId::parse_str("64da237125323006deed0cdc").unwrap()),
            name: "Alice".to_owned(),
            user_id: "1".to_owned(),
            balance: 1000.,
        });
        Ok(result)
    });

    mock_repo.get_user(&user_id).await.unwrap();
  
}
