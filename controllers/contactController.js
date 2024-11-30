const asyncHandler = require("express-async-handler")
const Contact = require('../models/contactModel')

const getContacts= asyncHandler(async (request, response )=>{
    const contacts = await Contact.find()
    response.status(200).json(contacts)
})
const createContact = asyncHandler(async (request, response )=>{
    console.log(request.body)
    const {name ,email, phone} =request.body
    if(!name || !email || !phone){
        response.status(400);
        throw new Error("All fields are mandatory !")
    }
    const contact = await Contact.create({
        name,
        email,
        phone
    })
    response.status(201).json(contact)
})
const getContact=  asyncHandler(async (request, response )=>{
    const {id}= request.params
    const contact = await Contact.findById(id)
    if(!contact){
        throw new Error("contact not found");
    }
    response.status(200).json(contact)
})

const updateContact = asyncHandler(async (request, response )=>{
    const contact = await Contact.findById(request.params.id)
    if(!contact){
        throw new Error("contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new:true}
    )
    response.status(200).json(updatedContact)
})
const deleteContact = asyncHandler(async (request, response )=>{
    const contact = await Contact.findById(request.params.id)
    if(!contact){
        throw new Error("contact not found");
    }
    const deleteContact = await Contact.findByIdAndDelete(request.params.id)
    response.status(200).json(deleteContact)
})

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}