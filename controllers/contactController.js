const Contact = require("../models/contactModel");
const contactValidationSchema = require("../validations/contactValidation");

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createContact = async (req, res) => {
  const { error } = contactValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact" });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ contactId: req.params.id });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateContact = async (req, res) => {
  const { error } = contactValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { contactId: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedContact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({ contactId: req.params.id });
    if (!deletedContact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
};


exports.searchContacts = async (req, res) => {
  try {
    console.log("Search API Hit");

    const { name, email } = req.query;
    console.log("Query Parameters:", { name, email });

    const query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; 
    }
    if (email) {
      query.email = { $regex: email, $options: "i" }; 
    }

    console.log("MongoDB Query:", query);

    const contacts = await Contact.find(query);
    console.log("Found Contacts:", contacts);

    if (contacts.length === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error searching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
