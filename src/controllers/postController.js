const { postService } = require('../services');
const { blogPostSchema, updatePostSchema } = require('../validations/blogPosts');

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

const updatePost = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { error } = updatePostSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const post = await postService.getById(id);
  if (post.type) return res.status(post.type).json({ message: post.message });
  if (Number(post.message.userId) !== Number(user.id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const { type, message } = await postService.updatePost(id, req.body);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const post = await postService.getById(id);
  if (post.type) return res.status(post.type).json({ message: post.message });
  if (Number(post.message.userId) !== Number(user.id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const { type, message } = await postService.deletePost(id);
  if (type) return res.status(type).json({ message });
  res.status(204).end();
};

module.exports = {
  createBlogPost,
  getAll,
  getById,
  updatePost,
  deletePost,
};