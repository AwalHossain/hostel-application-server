const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Food item Name"],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Please Enter Food item Price"],
      maxLength: [4, "Price cannot exceed 4 characters"],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("FoodItem", FoodItemSchema);
