module.exports.getMyInfo = (req, res) => {
  res.send({ message: 'info sent' });
};
module.exports.changeMyInfo = (req, res) => {
  res.send({ message: 'info changed' });
};
module.exports.signIn = (req, res) => {
  res.send({ message: 'logged in' });
};
module.exports.createUser = (req, res) => {
  res.send({ message: 'user created' });
};
