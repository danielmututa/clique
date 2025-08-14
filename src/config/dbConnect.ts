




import mongoose, { Connection, ConnectOptions } from 'mongoose'

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error('❌ Please define the MONGODB_URI environment variable in your .env file')
  }
  return uri
}

declare global {
  var mongoose: {
    conn: Connection | null
    promise: Promise<Connection> | null
  }
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose: {
    conn: Connection | null
    promise: Promise<Connection> | null
  }
}

let cached = globalWithMongoose.mongoose || { conn: null, promise: null }

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = cached
}

export async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) return cached.conn

  const uri = getMongoUri()

  if (!cached.promise) {
    const options: ConnectOptions = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(uri, options).then(m => {
      console.log("✅ Connected to MongoDB Atlas")
      return m.connection
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
