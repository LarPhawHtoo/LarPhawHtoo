import express from 'express';
import { getPosts,findPost,createPost,updatePost,deletePost } from '../controllers/post.controller';
const router=express.Router();

router
.route("/")
.get(getPosts)

router
.route("/create") 
.post(createPost)     

router
.route("/read/:id") 
.get(findPost)

router
.route("/update/:id")
.put(updatePost)

router
.route("/delete/:id")
.delete(deletePost)

export default router;