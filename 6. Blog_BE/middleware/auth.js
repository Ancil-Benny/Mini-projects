module.exports = {
    isAuthenticated: (req, res, next) => {
      if (req.session.user) {
        return next();
      }
      res.redirect('/users/login');
    },
    isOwner: async (req, res, next) => {
      const { Post } = require('../models');
      const post = await Post.findByPk(req.params.id);
      if (post && post.userId === req.session.user.id) {
        return next();
      }
      res.status(403).json({ message: 'Forbidden' });
    }
  };