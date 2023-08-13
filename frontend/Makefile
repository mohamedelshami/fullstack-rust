# This Makefile will build a Docker image this project.

.PHONY: all build run

all: build

build:
	docker build -t carbon-ui .

run:
	docker run -p 3000:3000 carbon-ui