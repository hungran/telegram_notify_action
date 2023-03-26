FROM cgr.dev/chainguard/go AS builder
COPY go.mod /app/go.mod
COPY go.sum /app/go.sum
COPY main.go /app/main.go
RUN cd /app && go build -o telegram .

FROM cgr.dev/chainguard/glibc-dynamic
COPY --from=builder /app/telegram /usr/bin/
CMD ["/usr/bin/telegram"]