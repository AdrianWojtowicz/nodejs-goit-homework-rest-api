const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const { sendEmail } = require(`${basedir}/utils`);


const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = schemas.email.validate({ email });
  if (error) {
    res.status(400).json({ message: "missing required field email" });
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  if (user.verify) {
    res.status(400).json({ message: "Verification has already been passed" });
    return;
  }
  const mail = {
    to: email,
    subject: "Phonebook app registration approvement",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click to verify</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
}

module.exports = resendVerifyEmail