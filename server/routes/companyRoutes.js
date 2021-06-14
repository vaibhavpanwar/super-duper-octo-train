import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import Company from "../models/companyModel.js";

// @desc    Fetch all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find();

  res.json(companies);
});
// @desc    Create a company
// @route   POST /api/companies
// @access  Public/
const addCompany = asyncHandler(async (req, res) => {
  const { name, cin } = req.body;
  const company = new Company({
    name,
    cin,
  });

  const createdCompany = await company.save();
  res.status(201).json(createdCompany);
});

router.route("/").get(getCompanies).post(addCompany);

export default router;
