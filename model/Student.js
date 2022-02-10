const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter student full name"],
      trim: true,
    },
    roll: {
      type: Number,
      required: [true, "Please Enter Student Roll"],
      unique: false,
    },
    age: {
      type: Number,
    },
    class: {
      type: String,
      required: [true, "Please Enter Class"],
    },
    hall: {
      type: String,
      required: [true, "Please Enter the hall name"],
    },
    status: {
      type: String,
      default: "active",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("StudentInformation", StudentSchema);
