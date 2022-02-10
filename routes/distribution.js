const Distribution = require("../model/Distribution");

const router = require("express").Router();

router.post("/distribute", async (req, res) => {
  try {
    console.log("hittin");
    let serveItem = new Distribution(req.body);

    if (!serveItem) {
      return res.status(402).json({
        success: false,
        message: "Input all item",
      });
    }
    console.log(serveItem);

    await serveItem.save();
    res.status(200).json({
      success: true,
      serveItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

// Get All the data

router.get("/getServe/data", async (req, res) => {
  try {
    console.log("working");

    const serveData = await Distribution.find();

    res.status(200).json({
      success: true,
      serveData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
