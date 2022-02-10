const Student = require("../model/Student");
const StudentInfo = require("../model/StudentInfo");
const ApiFeatures = require("../utils/apifeatures");

const router = require("express").Router();

router.post("/upload/student/information", async (req, res, next) => {
  try {
    console.log("hello");
    const newStudent = new StudentInfo(req.body);

    // const existRoll = await Student.findOne({ roll: req.body.roll });
    // console.log(existRoll);
    // if (existRoll) {
    //   return res.status(402).json({
    //     success: false,
    //     message: "Sorry the roll already exist",
    //   });
    // }
    console.log(req.body.name);
    if (!newStudent) {
      return res.status(402).json({
        success: false,
        message: "Please input all item",
      });
    }

    const saveStudentInfo = await newStudent.save();
    res.status(200).json({
      success: true,
      saveStudentInfo,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

// Edit student information

router.put("/student/info/update/:id", async (req, res) => {
  console.log("sitil");
  let studentInfo = await StudentInfo.findById(req.params.id);
  try {
    if (!studentInfo) {
      return res.status(402).json({
        success: false,
        message: "Student not found",
      });
    }

    studentInfo = await StudentInfo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log(studentInfo);
    res.status(200).json({
      success: true,
      studentInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

//  Delete Student info

router.delete("/student/info/delete/:id", async (req, res) => {
  console.log("hitting");
  try {
    let studentInfo = await StudentInfo.findById(req.params.id);
    console.log(studentInfo, "whats");
    if (!studentInfo) {
      return res.status(400).json({
        success: false,
        message: "student info is not found",
      });
    }

    await studentInfo.remove();
    res.status(200).json({
      success: true,
      message: "student information Delete successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

// get all student Data

router.get("/getAllInfo", async (req, res) => {
  try {
    const resultPerPage = 5;
    const productsCount = await StudentInfo.countDocuments();

    const apiFeature = new ApiFeatures(StudentInfo.find(), req.query).search();

    let products = await apiFeature;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

// Get specific student data

router.get("/getAllData", async (req, res) => {
  try {
    const allStudent = await StudentInfo.find();
    console.log(allStudent);
    // if (!allStudent) {
    //   return res.status(402).json({
    //     success: false,
    //     message: "Sorry you data no found",
    //   });
    // }
    // console.log(req.body.name);

    res.status(200).json({
      success: true,
      allStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

// Get specific food item
router.get("/singleData/:id", async (req, res) => {
  try {
    console.log("gettin", req.params.id);
    const existStudent = await StudentInfo.findById(req.params.id);
    console.log(existStudent);
    if (!existStudent) {
      return res.status(402).json({
        success: false,
        message: "Sorry you data no found",
      });
    }
    console.log(req.body.name);

    res.status(200).json({
      success: true,
      existStudent,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
