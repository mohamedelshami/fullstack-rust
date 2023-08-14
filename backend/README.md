# Carbon Server

## This Repo

This repository contains code for a simple microservice written in Rust using the Tokio Axum framework. 

## Authors

Mohamed Elshami

## Resources

## Start MongoDB Docker

 docker run --name some-mongo -d mongo:tag

 https://github.com/Mr-Malomz/rocket-mongo-api/blob/main/src/repository/mongodb_repo.rs

 docker run -it --network some-network --rm mongo mongosh --host some-mongo test

## Usage

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "user_id": "john", "balance": 1000}' \
  http://localhost:8080/users/create

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "user_id": "alice", "balance": 1000}' \
  http://localhost:8787/users/create

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"sender": "alice", "receiver": "john", "balance": 1000, "amount": 10}' \
  http://localhost:8080/transactions/transfer

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"sender": "bob", "receiver": "john", "balance": 1000, "amount": 10}' \
  http://localhost:8080/transactions/transfer


  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob", "user_id": "bob", "balance": 1000}' \
  http://localhost:8787/users/create

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"sender": "bob", "receiver": "john", "balance": 1000, "amount": 10}' \
  http://localhost:8787/transactions/transfer


curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"sender": "dave", "receiver": "john", "balance": 10000, "amount": 10}' \
  http://localhost:8787/transactions/transfer