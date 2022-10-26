const Sequelize = require('sequelize');

const { Category, PostCategory, BlogPost } = require('../models');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const getCategoryById = async (id) => {
  try {
    const response = await Category.findByPk(id);

    if (!response) return { type: 400, message: 'Category not found' };

    return { type: null, message: response };
  } catch (error) {
    return { type: 500, message: 'Something went wrong' };
  }
};

const createBlogPost = async ({ title, content, categoryIds, userId }) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const response = await BlogPost.create({ title, content, userId }, { transaction: t });
      const { published, updated, id } = response;

      const promises = categoryIds.map(async (idCat) => {
        const data = await PostCategory.create({ postId: id, categoryId: idCat }, { transaction: t });
        return data;
      });
      await Promise.all(promises);
      return { type: null, message: { id, title, content, published, updated } };
    });
    return result;
  } catch (e) {
    console.log(e.message);
    return { type: 500, message: 'Something went wrong' };
  }
};

module.exports = {
  getCategoryById,
  createBlogPost,
};