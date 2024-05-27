import mongoose from "mongoose";

// Define the schema
const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Added required field for better data integrity
    email: { type: String, required: true, unique: true }, // Ensured email is unique and required
    phoneNumber: { type: String, required: true } // Added required field for better data integrity
});

// Create the model
const Client = mongoose.model("Client", ClientSchema); 

// Export the model
export default Client; 
