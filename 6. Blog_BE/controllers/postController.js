const { Op } = require('sequelize');
const { Post, User } = require('../models');

// Render create post page
exports.renderCreatePost = (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;
  res.render('createPost', { userId });
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const post = await Post.create({ title, content, userId });
    res.status(201).redirect('/posts');
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: User });
    res.render('index', { posts, user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, { include: User });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

// Render update post page
exports.renderUpdatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.render('updatePost', { post });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.status(200).redirect('/posts');
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.destroy();
    res.status(200).redirect('/posts');
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

// Search posts by title or content and render the index view
exports.searchPosts = async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } }
        ]
      },
      include: User
    });
    res.render('index', { posts, user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: 'Error searching posts', error });
  }
};