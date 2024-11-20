const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { isAuthenticated, isOwner } = require('../middleware/auth');

router.post('/', isAuthenticated, postController.createPost);
router.get('/search', postController.searchPosts);
router.get('/create', isAuthenticated, postController.renderCreatePost);
router.get('/:id/edit', isAuthenticated, isOwner, postController.renderUpdatePost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', isAuthenticated, isOwner, postController.updatePost);
router.delete('/:id', isAuthenticated, isOwner, postController.deletePost);

module.exports = router;