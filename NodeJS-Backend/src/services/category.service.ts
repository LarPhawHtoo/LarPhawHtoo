import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';
import Category from "../models/Category";

export const getCategoryService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();
    if (categories) {
      res.json({
        message: "Category Fetched",
        data: categories,
        status: 1
      });
    }
  } catch (err) {
    next(err);
  }
  
};

export const createCategoryService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const categoryList = req.body; 
    const result: any = await Category.insertMany(categoryList);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const findCategoryService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error: any = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: category, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const updateCategoryService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const category: any = await Category.findById(req.params.id);
    if (!category) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    const categoryList = req.body;
    category.categoryList = categoryList;
    const result = await category.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const deleteCategoryService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const category: any = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }
    res.json({
      message: "Category deleted successfully!",
      data: category,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};