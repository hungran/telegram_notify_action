FROM cgr.dev/chainguard/go AS builder
COPY go.mod /app/go.mod
COPY go.sum /app/go.sum
COPY main.go /app/main.go
RUN cd /app && go build -o telegram .

FROM cgr.dev/chainguard/glibc-dynamic:latest@sha256:097a9da503f773ccbff78104a2cc8518923e57a3023cd1631e7d70c40085c334
COPY --from=builder /app/telegram /usr/bin/
CMD ["/usr/bin/telegram"]