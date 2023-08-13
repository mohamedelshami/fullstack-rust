# This Makefile will build a Docker image this project.

.PHONY: all build run

all: build

build:
	docker build -t carbon-sim .

run:
	docker run -e RUST_LOG="info,tower_http=trace" -e MONGOURI=mongodb://host.docker.internal:27017 -p 8787:8787 carbon-sim