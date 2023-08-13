FROM rust:latest as build

RUN rustup target add wasm32-uknown-uknown
RUN cargo install trunk wasm-bingen-cli

WORKDIR /usr/src/simple-ms-rust
COPY . .

RUN cargo build --release

FROM gcr.io/distroless/cc-debian10

COPY --from=build /usr/src/<>/target/release/simple-ms /usr/local/bin/simple-ms
COPY --from=build /usr/src/<>/frontend/dist /usr/local/bin/dist

WORKDIR /usr/local/bin
CMD ["backend"]