module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',{
    categoryId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }

  return PostCategory;
}