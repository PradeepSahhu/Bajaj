import mongoose from "mongoose";
import User from "../models/user.models.js";
import { findHighestAlphabet } from "../utils/helpers.js";

const postBfhl = async (req, res) => {
  try {
    // Fetch data from MongoDB
    const user = await User.findOne({});

    if (!user || !Array.isArray(user.data)) {
      return res.status(400).json({
        is_success: false,
        user_id: `${user.full_name}_${user.dob}`, // Assuming full_name and dob are set in the user document
        error: "Invalid data in database",
      });
    }

    const numbers = user.data.filter((item) => !isNaN(item));
    const alphabets = user.data.filter(
      (item) => isNaN(item) && item.length === 1
    );
    const highestAlphabet = findHighestAlphabet(alphabets);

    const response = {
      is_success: true,
      user_id: `${user.full_name}_${user.dob}`, // Assuming full_name and dob are set in the user document
      email: user.email,
      roll_number: user.roll_number,
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
    };

    res.json(response);
  } catch (error) {
    console.error("Error in postBfhl:", error);
    res.status(500).json({
      is_success: false,
      user_id: `${user.full_name}_${user.dob}`, // Assuming full_name and dob are set in the user document
      error: "Internal server error",
    });
  }
};

const getBfhl = (req, res) => {
  console.log("this request is being called");
  res.status(200).json({ operation_code: 1 });
};

export { postBfhl, getBfhl };
