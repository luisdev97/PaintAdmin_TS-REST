import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';


//Client Interface to validate Client Type
export interface Client extends mongoose.Document {
    name: String,
    lastName: String,
    phoneNum: Number,
    address: String
}

//Client Schema to establish the properties of the clients collection on MongoDB 
const clientSchema: Schema = new Schema({
    name: { type: String, minlength: 2, maxlength: 50, required: true },
    lastName: { type: String, minlength: 8, maxlength: 80, required: true },
    phoneNum: { type: Number, min: 611111111, max: 699999999, required: true},
    address: { type: String, minlength: 10, maxlength: 100, required: true }
});




//Export the Client Model to interact with Mongoose
export default model<Client>('Client',clientSchema);