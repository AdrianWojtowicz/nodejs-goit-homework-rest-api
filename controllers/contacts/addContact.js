const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contact`);

const addContact = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const { id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
}

module.exports = addContact