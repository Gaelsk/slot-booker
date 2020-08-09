const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const Booking = require("./models/Booking");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://Gael:gaelslot2020@ds263156.mlab.com:63156/slot-book", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connected"))
  .catch(e => console.error(e));

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//routes
app
  .get("/bookings", async (req, res) => {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  })
  .post("/bookings", async (req, res) => {
    const newDoc = await new Booking({ ...req.body }).save();
    res.json(newDoc);
  });

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
