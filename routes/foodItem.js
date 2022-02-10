const FoodItem = require("../model/FoodItem");
const ApiFeatures = require("../utils/apifeatures");

const router = require("express").Router();

// Upload food item and cost

router.post("/uploadFoodItems", async (req, res, next) => {
  try {
    const newFoodItem = new FoodItem(req.body);

    const existName = await FoodItem.findOne({ name: req.body.name });
    console.log(existName);
    if (existName) {
      return res.status(402).json({
        success: false,
        message: "Sorry you food item is already exist",
      });
    }
    console.log(req.body.name);
    if (!newFoodItem) {
      return res.status(402).json({
        success: false,
      });
    }

    const saveFoodItem = await newFoodItem.save();
    res.status(200).json({
      success: true,
      saveFoodItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

// Edit food item

router.put("/foodItem/update/:id", async (req, res) => {
  console.log("sitil");
  let foodItem = await FoodItem.findById(req.params.id);
  try {
    if (!foodItem) {
      return res.status(402).json({
        success: false,
        message: "item is not found",
      });
    }
    console.log(foodItem);

    foodItem = await FoodItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log(foodItem);
    res.status(200).json({
      success: true,
      foodItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

// Delete FoodItem

router.delete("/foodItem/delete/:id", async (req, res) => {
  console.log("hitting");
  try {
    let foodItem = await FoodItem.findById(req.params.id);
    console.log(foodItem, "whats");
    if (!foodItem) {
      return res.status(400).json({
        success: false,
        message: "item is not found",
      });
    }

    await foodItem.remove();
    res.status(200).json({
      success: true,
      message: "Product Delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

// Get specific food item
router.get("/single/:id", async (req, res) => {
  try {
    console.log("gettin", req.params.id);
    const existFood = await FoodItem.findById(req.params.id);
    console.log(existFood);
    if (!existFood) {
      return res.status(402).json({
        success: false,
        message: "Sorry you food item not found",
      });
    }
    console.log(req.body.name);

    res.status(200).json({
      success: true,
      existFood,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

// All Food Item with pagination

router.get("/getAllItem", async (req, res) => {
  try {
    console.log("working");

    const resultPerPage = 2;
    const productsCount = await FoodItem.countDocuments();
    const apiFeature = new ApiFeatures(FoodItem.find(), req.query).search();
    // let foodItem = await FoodItem.find();
    // console.log(foodItem, "whats");

    if (!apiFeature) {
      return res.status(400).json({
        success: false,
        message: "item is not found",
      });
    }

    let products = await apiFeature;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,
      resultPerPage,
      productsCount,
      filteredProductsCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

// All food item
router.get("/getAllFood/item", async (req, res) => {
  try {
    console.log("working");

    const allFoodItem = await FoodItem.find();

    res.status(200).json({
      success: true,
      allFoodItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
