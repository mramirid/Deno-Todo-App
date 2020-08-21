# Deno Todo App (Backend)

Server side implementation of Deno Todo app built with Deno & Oak framework

## How to run?

1. Create a Mongo Atlas cluster & connect this app to your cluster (fill the .env)

2. Run the server

```bash 
$ deno run --allow-net --unstable --allow-read --allow-write --allow-env --allow-plugin app.ts
```