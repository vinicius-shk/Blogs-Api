module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true }
  },
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'blog_posts',
      underscored: true,
    });

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreignKey: 'id',
        as: 'user',
      })
    }

  return BlogPost;
};