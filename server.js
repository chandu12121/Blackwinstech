const express = require("express");
const mongoose = require("mongoose");
const contactRoutes = require("./routes/contactRoutes");
const { mongoURI } = require("./config");

const app = express();
app.use(express.json());

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection failed:", err));

app.use("/contacts", contactRoutes);
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
