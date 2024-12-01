const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (request, response) => {
    const contacts = await Contact.find({ user_id: request.user.id });
    response.status(200).json(contacts);
});

const createContact = asyncHandler(async (request, response) => {
    console.log(request.body);
    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
        response.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: request.user.id
    });
    response.status(201).json(contact);
});

const getContact = asyncHandler(async (request, response) => {
    const { id } = request.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        throw new Error("Contact not found");
    }
    response.status(200).json(contact);
});

const updateContact = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("User doesn't have permission to update other user's contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    );
    response.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== request.user.id) {
        response.status(403);
        throw new Error("User doesn't have permission to delete other user's contact");
    }
    const deletedContact = await Contact.findByIdAndDelete(request.params.id);
    response.status(200).json(deletedContact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};
