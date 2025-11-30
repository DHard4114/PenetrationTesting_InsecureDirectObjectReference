// User Controller for vulnerable endpoints
const userRepository = require('../repository/userRepository');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userRepository.login(username, password);
    if (user) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userRepository.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
