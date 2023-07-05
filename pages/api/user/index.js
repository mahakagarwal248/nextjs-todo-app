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

  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      try {
        const existingUser = await db
          .collection("nextusers")
          .findOne({ email: bodyObject?.email });

        console.log(existingUser);
        if (existingUser) {
          return res.status(400).json({ message: "User already exist" });
        }
        const hashedPassword = await bcrypt.hash(bodyObject?.password, 12);
        const hashedAns = await bcrypt.hash(bodyObject?.securityAns, 12);
        const userObj = {
          name: bodyObject?.name,
          email: bodyObject?.email,
          password: hashedPassword,
          mobile: bodyObject?.mobile,
          securityQues: bodyObject?.securityQues,
          securityAns: hashedAns,
        };
        const newUser = await db.collection("nextusers").insertOne(userObj);
        const token = jwt.sign(
          { email: newUser?.email, id: newUser?._id },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
        );
        return res.status(200).json({
          result: newUser,
          token,
          message: "Registered Successfully!",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong..." });
      }
    case "GET":
      const { email, password } = req?.query;
      console.log(req.query);
      try {
        const existingUser = await db
          .collection("nextusers")
          .findOne({ email });
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
          result: existingUser,
          token,
          message: "Logged In Successfully!",
        });
      } catch (error) {
        return res.status(500).json({ message: "Something went wrong..." });
      }
  }
}
