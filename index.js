import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';

import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from './Kambaz/Modules/routes.js';
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING ||
  'mongodb://127.0.0.1:27017/kambaz';

const PORT = process.env.PORT || 4000;

console.log('🔗 Connecting to MongoDB with URI:', CONNECTION_STRING);

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("✅ MongoDB connected");

    const app = express();

    // ---------------------------------------
    // ⭐ FIXED CORS CONFIG FOR VERCEL FRONTEND
    // ---------------------------------------
    app.use(
      cors({
        credentials: true,
        origin: [
          "http://localhost:3000",
          "http://localhost:5173", 
          "https://kambaz-next-js-5ms5.vercel.app"  // ⬅️ your Vercel frontend
        ],
      })
    );

    // ---------------------------------------
    // ⭐ FIXED SESSION (REQUIRED FOR RENDER)
    // ---------------------------------------
    app.set("trust proxy", 1);  // Required to set secure cookies behind HTTPS proxy

    const sessionOptions = {
      secret: process.env.SESSION_SECRET || "kambaz",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "none",
        secure: true,     // required for HTTPS (Render + Vercel)
      }
    };

    app.use(session(sessionOptions));
    app.use(express.json());

    // ---------------------------------------
    // ⭐ ROUTES
    // ---------------------------------------
    UserRoutes(app);
    CourseRoutes(app);
    ModuleRoutes(app);
    AssignmentRoutes(app);
    EnrollmentRoutes(app);
    Lab5(app);
    Hello(app);

    app.listen(PORT, () => {
      console.log(`🚀 Server running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
