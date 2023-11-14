// DsCwD71Cbk27dJPK

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://poladikksp:DsCwD71Cbk27dJPK@miraplay-cluster.wqjew3j.mongodb.net/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function registerUser(userInfo) {
  try {
    await client.connect();
    const db = await client.db("users");
    const usersCollection = await db.collection("usersList");
    const isUserExist = await usersCollection.findOne({ email: userInfo.email });
    if (isUserExist) {
      return { error: "User with this email already exists" };
    }
    await usersCollection.insertOne(userInfo);
    return { success: true };
  } finally {
    await client.close();
  }
}

export async function findUser(userEmail) {
  try {
    await client.connect();
    const db = await client.db("users");
    const usersCollection = await db.collection("usersList");
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      return null;
    }
    return user;
  } finally {
    await client.close();
  }
}
