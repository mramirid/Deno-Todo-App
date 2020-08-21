import { MongoClient, Database } from "https://deno.land/x/mongo@v0.10.1/mod.ts"
import "https://deno.land/x/dotenv/load.ts"

const CLUSTER_NAME = Deno.env.get('CLUSTER_NAME')
const DB_NAME = Deno.env.get('DB_NAME')
const DB_USERNAME = Deno.env.get('DB_USERNAME')
const DB_PASSWORD = Deno.env.get('DB_PASSWORD')
const MONGODB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_NAME}.dxksd.mongodb.net/?retryWrites=true&w=majority`

let db: Database

export function connectDB() {
  if (!db) {
    const client = new MongoClient()
    client.connectWithUri(MONGODB_URL)
    db = client.database(DB_NAME!)
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Cannot connect to the database')
  }
  return db
}