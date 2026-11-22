import mongoose from "mongoose"

declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  } | undefined
}

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongooseConnection

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null }
}

export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    )
  }

  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB || "casino",
    }

    cached!.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
      return mongooseInstance
    })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}

export default connectToDatabase
