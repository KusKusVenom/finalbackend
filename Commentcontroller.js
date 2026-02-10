const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { validationResult } = require('express-validator');

// Get all comments for a post
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    
    res.json({ comments, count: comments.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new comment
exports.createComment = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;
    const { postId } = req.params;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = new Comment({
      content,
      author: req.user._id,
      post: postId
    });

    await comment.save();
    await comment.populate('author', 'username email');

    res.status(201).json({
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update comment
exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is owner or admin
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.content = content || comment.content;

    await comment.save();
    await comment.populate('author', 'username email');

    res.json({
      message: 'Comment updated successfully',
      comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is owner or admin
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all comments (admin only)
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('author', 'username email')
      .populate('post', 'title')
      .sort({ createdAt: -1 });
    
    res.json({ comments, count: comments.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};