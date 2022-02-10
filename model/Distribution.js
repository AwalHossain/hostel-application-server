const mongoose = require("mongoose");

const DistributeSchema = new mongoose.Schema(
  {
    studentId: {
      type: Number,
      required: [true, "Please Enter Food item Name"],
    },
    shift: {
      type: String,
      required: [true, "Please Enter Shift"],
    },
    foodItem: {
      type: String,
      required: [true, "Please Enter foodItem"],
    },
    status: {
      type: String,
      required: [true, "Please Enter Status"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("distribute", DistributeSchema);
