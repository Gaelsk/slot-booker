const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  user: { type: mongoose.Schema.Types.Map, required: true },
  booked: mongoose.Schema.Types.Boolean,
  bookedFor: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
