const bcrypt = require("bcryptjs");
const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Błąd z Joi lub innej biblioteki walidacji" });
    return;
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(409).json({ message: "Email in use" });
    return;
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      subscription: result.subscription,
    },
  });
}

module.exports = register