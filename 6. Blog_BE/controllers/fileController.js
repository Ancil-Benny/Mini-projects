const ExcelJS = require('exceljs');
const { Post, User } = require('../models');

// Export posts to Excel
exports.exportPostsToExcel = async (req, res) => {
  const userId = req.session.user.id;
  try {
    const posts = await Post.findAll({ where: { userId }, include: User });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Posts');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Content', key: 'content', width: 50 },
      { header: 'User', key: 'user', width: 20 },
      { header: 'Created At', key: 'createdAt', width: 20 }
    ];

    posts.forEach(post => {
      worksheet.addRow({
        id: post.id,
        title: post.title,
        content: post.content,
        user: post.User.username,
        createdAt: post.createdAt
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=posts.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: 'Error exporting posts to Excel', error });
  }
};