const { postService } = require('../services');
const { blogPostSchema } = require('../validations/blogPosts');

const createBlogPost = async (req, res) => {
  const { user } = req;
  const { error } = blogPostSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const promises = req.body.categoryIds.map(async (id) => {
    const { type } = await postService.checkCategoryById(id);
    return type;
  });

  const treated = await Promise.all(promises);
  if (treated.some((type) => type !== null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  
  const { type, message } = await postService.createBlogPost({ ...req.body, userId: user.id });

  if (type) return res.status(type).json({ message });

  res.status(201).json({ ...message, userId: user.id });
};

const getAll = async (_req, res) => {
  const { type, message } = await postService.getAll();

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { type, message } = await postService.getById(req.params.id);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

module.exports = {
  createBlogPost,
  getAll,
  getById,
};