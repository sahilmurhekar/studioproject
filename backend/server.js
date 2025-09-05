import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('RMS_DB');
    console.log('📦 Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Contact API (existing)
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message, serviceType } = req.body;

  try {
    const transporter = nodemailer.createTransporter({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_TO,
      subject: `🎵 ${subject} | Royal Music Studio`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Royal Music Studio Contact</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#0d0d0d; color:#f5f5f5;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0d0d0d; padding:30px 0;">
<tr>
<td align="center">
<table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#1a1a1a; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.5);">
<tr>
<td align="center" style="background:#111; padding:20px;">
<img src="https://i.postimg.cc/KvfLkgrR/logo.png" alt="Royal Music Studio" width="120" style="display:block; margin:auto;" />
<h1 style="color:#e6e6e6; margin:10px 0 0; font-size:22px; font-weight:600;">Royal Music Studio</h1>
</td>
</tr>
<tr>
<td style="padding:30px; color:#f5f5f5;">
<h2 style="color:#f5f5f5; font-size:20px; margin:0 0 15px;">Royal Musical Studios New Submission</h2>
<p style="margin:8px 0;"><b style="color:#a970ff;">Name:</b> ${name}</p>
<p style="margin:8px 0;"><b style="color:#a970ff;">Email:</b> ${email}</p>
<p style="margin:8px 0;"><b style="color:#a970ff;">Phone:</b> ${phone || "N/A"}</p>
<p style="margin:8px 0;"><b style="color:#a970ff;">Service:</b> ${serviceType}</p>
<p style="margin:8px 0;"><b style="color:#a970ff;">Message:</b></p>
<p style="background:#262626; padding:15px; border-radius:8px; color:#d9d9d9;">${message}</p>
</td>
</tr>
<tr>
<td align="center" style="background:#111; padding:15px; color:#999; font-size:12px;">
© ${new Date().getFullYear()} Royal Music Studio. All Rights Reserved.<br/>
<a href="https://royalmusicstudio.com" style="color:#a970ff; text-decoration:none;">Visit Website</a>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Email failed to send" });
  }
});

// Get all beats
app.get("/api/beats", async (req, res) => {
  try {
    const beats = await db.collection('beats').find({}).toArray();
    res.status(200).json({ success: true, beats });
  } catch (error) {
    console.error("Error fetching beats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch beats" });
  }
});



// Improved delete user collection endpoint in server.js
app.delete("/api/user-collection/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email);

    console.log(`🗑️ DELETE request received for email: ${decodedEmail}`);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(decodedEmail)) {
      console.log(`❌ Invalid email format: ${decodedEmail}`);
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Check if database connection exists
    if (!db) {
      console.error('❌ Database connection not available');
      return res.status(500).json({
        success: false,
        message: "Database connection error"
      });
    }

    console.log(`🔍 Searching for user collection with email: ${decodedEmail}`);

    // First, check if the document exists
    const existingDoc = await db.collection('user_collections').findOne({ email: decodedEmail });

    if (existingDoc) {
      console.log(`📄 Found existing document for ${decodedEmail}:`, {
        id: existingDoc._id,
        savedBeats: existingDoc.savedBeats?.length || 0,
        purchasedBeats: existingDoc.purchasedBeats?.length || 0
      });
    } else {
      console.log(`📄 No existing document found for ${decodedEmail}`);
    }

    // Attempt to delete
    const result = await db.collection('user_collections').deleteOne({ email: decodedEmail });

    console.log(`🗑️ Delete operation result:`, {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount
    });

    if (result.acknowledged) {
      if (result.deletedCount > 0) {
        console.log(`✅ Successfully deleted user collection for: ${decodedEmail}`);
        res.status(200).json({
          success: true,
          message: "User collection deleted successfully",
          deletedCount: result.deletedCount,
          email: decodedEmail
        });
      } else {
        console.log(`⚠️ No user collection found to delete for: ${decodedEmail}`);
        res.status(200).json({
          success: true,
          message: "No user collection found to delete",
          deletedCount: 0,
          email: decodedEmail
        });
      }
    } else {
      console.error(`❌ Delete operation not acknowledged for: ${decodedEmail}`);
      res.status(500).json({
        success: false,
        message: "Delete operation failed - not acknowledged by database"
      });
    }
  } catch (error) {
    console.error("❌ Error in delete user collection endpoint:", error);
    console.error("Error stack:", error.stack);

    res.status(500).json({
      success: false,
      message: "Failed to delete user collection",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});



// Get user collection (saved & purchased beats)
app.get("/api/user-collection/:email", async (req, res) => {
  try {
    const { email } = req.params;
    let userCollection = await db.collection('user_collections').findOne({ email });

    if (!userCollection) {
      // Create new user collection if doesn't exist
      userCollection = {
        email,
        savedBeats: [],
        purchasedBeats: []
      };
      await db.collection('user_collections').insertOne(userCollection);
    }

    res.status(200).json({ success: true, userCollection });
  } catch (error) {
    console.error("Error fetching user collection:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user collection" });
  }
});

// Save beat to user collection
app.post("/api/save-beat", async (req, res) => {
  try {
    const { email, beatId } = req.body;

    const result = await db.collection('user_collections').updateOne(
      { email },
      {
        $addToSet: { savedBeats: beatId },
        $setOnInsert: { email, purchasedBeats: [] }
      },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: "Beat saved to collection" });
  } catch (error) {
    console.error("Error saving beat:", error);
    res.status(500).json({ success: false, message: "Failed to save beat" });
  }
});

// Remove beat from saved collection
app.post("/api/unsave-beat", async (req, res) => {
  try {
    const { email, beatId } = req.body;

    await db.collection('user_collections').updateOne(
      { email },
      { $pull: { savedBeats: beatId } }
    );

    res.status(200).json({ success: true, message: "Beat removed from collection" });
  } catch (error) {
    console.error("Error removing beat:", error);
    res.status(500).json({ success: false, message: "Failed to remove beat" });
  }
});

// Purchase beat (simplified for now)
app.post("/api/purchase-beat", async (req, res) => {
  try {
    const { email, beatId } = req.body;

    const result = await db.collection('user_collections').updateOne(
      { email },
      {
        $addToSet: { purchasedBeats: beatId },
        $setOnInsert: { email, savedBeats: [] }
      },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: "Beat purchased successfully" });
  } catch (error) {
    console.error("Error purchasing beat:", error);
    res.status(500).json({ success: false, message: "Failed to purchase beat" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
