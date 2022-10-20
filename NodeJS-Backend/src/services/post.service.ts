import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Post from '../models/Post';

export const getPostService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find();
    if (posts) {
      res.json({
        message: "Post Fetched",
        data: posts,
        status: 1
      });
    }
  } catch (err) {
    next(err);
  }
  
};

export const createPostService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const postList = req.body; 
    const result: any = await Post.insertMany(postList);
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const findPostService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error: any = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: post, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const updatePostService = async (
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
    const post: any = await Post.findById(req.params.id);
    if (!post) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    const postList = req.body;
    post.postList = postList;
    const result = await post.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const deletePostService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: any = await Post.findByIdAndRemove(req.params.id);
    if (!post) {
      const error: any = Error("Not Found");
      error.statusCode = 401;
    }
    res.json({
      message: "Post deleted successfully!",
      data: post,
      status: 1,
    });
  } catch (err) {
    next(err);
  }
};