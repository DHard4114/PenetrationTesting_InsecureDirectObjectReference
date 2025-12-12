// Middleware validasi format UUID
module.exports = (req, res, next) => {
  const { id } = req.params;
  if (id && !/^[0-9a-fA-F-]{36}$/.test(id)) {
    return res.status(400).json({ message: 'Invalid UUID format' });
  }
  next();
};
