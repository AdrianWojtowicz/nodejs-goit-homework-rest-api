const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);

const updateSubscriptionUser = async (req, res) => {
  const { error } = schemas.updateSubscriptionUser.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
}

module.exports = updateSubscriptionUser