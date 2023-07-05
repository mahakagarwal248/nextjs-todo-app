// posts.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "../../../libs/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");

  if (!client.isConnected() || client.db().databaseName !== "test") {
    res.status(500).json({ error: "Database is not connected" });
    return;
  } else {
    console.log("🚀 ~ file: index.js:1 ~ handler ~ db: DB Connected");
  }
  console.log(req);

  switch (req.method) {
    case "GET":
      const { email, password } = req?.query;
      try {
        const existingUser = await userSchema.findOne({ email });
        if (!existingUser) {
          return res.status(404).json({ message: "User doesn't exist" });
        }

        const isPasswordCrt = await bcrypt.compare(
          password,
          existingUser?.password
        );
        if (!isPasswordCrt) {
          return res.status(400).json({ message: "Wrong Password" });
        }

        const token = jwt.sign(
          { email: existingUser?.email, id: existingUser?._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
        //   result: existingUser,
          token,
          message: "Logged In Successfully!",
        });
      } catch (error) {
        return res.status(500).json("Something went wrong...");
      }
  }
}
