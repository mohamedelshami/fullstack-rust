FROM rust:1.71.1 as build

RUN rustup target add wasm32-unknown-unknown

WORKDIR /usr/src/carbon-sim
COPY . .

RUN cargo build --release

FROM gcr.io/distroless/cc-debian11

COPY --from=build /usr/src/carbon-sim/target/release/carbon-sim /usr/local/bin/carbon-sim

WORKDIR /usr/local/bin

ENV SERVER=0.0.0.0:8787
ENV RUST_LOG=info,tower_http=trace
ENV MONGOURI=mongodb://carbon-db:27017
ENV RUST_LOG=mongodb::command=debug

EXPOSE 8787
CMD ["carbon-sim"]