// api/index.js
import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();

// CORS setup
const corsOptions = {
  origin: [
    "https://royalmusicalstudios.vercel.app",  // production frontend
    "http://localhost:3000" // dev frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // <-- handle preflight requests

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (cached across invocations)
let cachedDb = null;
let cachedClient = null;

const connectDB = async () => {
  if (cachedDb && cachedClient) {
    return cachedDb;
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    await client.connect();
    const db = client.db("RMS_DB");

    cachedClient = client;
    cachedDb = db;

    console.log("📦 Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: "Royal Music Studio API is running",
    timestamp: new Date().toISOString()
  });
});

// Contact API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message, serviceType } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: process.env.MAIL_PORT == "465",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.MAIL_USER}>`,
      replyTo: email,
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
<h2 style="color:#f5f5f5; font-size:20px; margin:0 0 15px;">New Contact Submission</h2>
<p style="margin:8px 0;"><b style="color:#a970ff;">Name:</b> ${name}</p>
<p style="margin:8px 0;"><b style="color:#a970ff;">Email:</b> ${email}</p>
<p style="margin:8px 0;"><b style="color:#a970ff;">Phone:</b> ${phone || "N/A"}</p>
<p style="margin:8px 0;"><b style="color:#a970ff;">Service:</b> ${serviceType || "N/A"}</p>
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
    res.status(500).json({
      success: false,
      message: "Email failed to send",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all beats
app.get("/api/beats", async (req, res) => {
  try {
    const db = await connectDB();
    const beats = await db.collection("beats").find({}).toArray();
    res.status(200).json({ success: true, beats });
  } catch (error) {
    console.error("Error fetching beats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch beats",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user collection
app.get("/api/user-collection/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(decodedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const db = await connectDB();
    let userCollection = await db.collection("user_collections").findOne({ email: decodedEmail });

    if (!userCollection) {
      userCollection = {
        email: decodedEmail,
        savedBeats: [],
        purchasedBeats: [],
        createdAt: new Date()
      };
      await db.collection("user_collections").insertOne(userCollection);
    }

    res.status(200).json({ success: true, userCollection });
  } catch (error) {
    console.error("Error fetching user collection:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user collection",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Save beat to user collection
app.post("/api/save-beat", async (req, res) => {
  try {
    const { email, beatId } = req.body;

    if (!email || !beatId) {
      return res.status(400).json({
        success: false,
        message: "Email and beatId are required"
      });
    }

    const db = await connectDB();
    await db.collection("user_collections").updateOne(
      { email },
      {
        $addToSet: { savedBeats: beatId },
        $setOnInsert: {
          email,
          purchasedBeats: [],
          createdAt: new Date()
        },
        $set: { updatedAt: new Date() }
      },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: "Beat saved to collection" });
  } catch (error) {
    console.error("Error saving beat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save beat",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Remove beat from saved collection
app.post("/api/unsave-beat", async (req, res) => {
  try {
    const { email, beatId } = req.body;

    if (!email || !beatId) {
      return res.status(400).json({
        success: false,
        message: "Email and beatId are required"
      });
    }

    const db = await connectDB();
    const result = await db.collection("user_collections").updateOne(
      { email },
      {
        $pull: { savedBeats: beatId },
        $set: { updatedAt: new Date() }
      }
    );

    res.status(200).json({
      success: true,
      message: "Beat removed from collection",
      modified: result.modifiedCount > 0
    });
  } catch (error) {
    console.error("Error removing beat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove beat",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Purchase beat
app.post("/api/purchase-beat", async (req, res) => {
  try {
    const { email, beatId } = req.body;

    if (!email || !beatId) {
      return res.status(400).json({
        success: false,
        message: "Email and beatId are required"
      });
    }

    const db = await connectDB();
    await db.collection("user_collections").updateOne(
      { email },
      {
        $addToSet: { purchasedBeats: beatId },
        $setOnInsert: {
          email,
          savedBeats: [],
          createdAt: new Date()
        },
        $set: { updatedAt: new Date() }
      },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: "Beat purchased successfully" });
  } catch (error) {
    console.error("Error purchasing beat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to purchase beat",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Delete user collection
app.delete("/api/user-collection/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const decodedEmail = decodeURIComponent(email);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(decodedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    const db = await connectDB();
    const result = await db.collection("user_collections").deleteOne({
      email: decodedEmail
    });

    res.status(200).json({
      success: true,
      message: result.deletedCount > 0
        ? "User collection deleted successfully"
        : "No user collection found to delete",
      deletedCount: result.deletedCount,
      email: decodedEmail
    });
  } catch (error) {
    console.error("Error deleting user collection:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user collection",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.path
  });
});

// Export the Express app as a serverless function
export default app;
