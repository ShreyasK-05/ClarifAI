require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const http = require("http");
const socketIO = require("socket.io");
const questionRoutes = require("./routes/question-routes");
const answerRoutes = require("./routes/answer-routes");
const voteRoutes = require("./routes/vote-routes");

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "*" },
  methods: ["GET", "POST", "PATCH"],
});
app.set("io", io);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(userId);
  }
  socket.on("disconnect", () => {
    console.log("Disconnected", userId);
  });
});


connectToDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/votes", voteRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});