const express = require("express");
const router = express.Router();
const User = require("./userModel");
const { hash, compare } = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      // console.log("User already exist");
      return res.json({ message: "User already Exists" });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    // console.log("User Saved");
    return res.json({ message: "User Saved" , userId: newUser.id });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      // console.log("User does'nt exists");
      return res.json({ message: "User don' Exists" });
    }
    const passwordCheck = await compare(password, userExist.password);
    if (!passwordCheck) {
      // console.log("wrong password");
      return res.json({ message: "Wrong Password" });
    }
    // console.log("User Loggedin");
    return res.json({ message: "User loggedIn" ,  userId: userExist.id });
  } catch (error) {
    console.log(error);
  }
});

router.post("/user", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) { 
      return res.json({ message: "User not found" });
    }
    return res.json({user});
  } catch (error) {
    console.log(error);
  }
}); 

router.delete("/user" , async(req , res) => {
  try {
  const userId = req.body.userId;
  const user = await User.findByIdAndDelete(userId);
  return res.json({message: "User deleted successfully"});
  } catch (error) {
    console.log(error);
  }
  
})

module.exports = router;
