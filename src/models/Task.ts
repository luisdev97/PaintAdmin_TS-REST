import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';


//Task Interface to validate Task Type
export interface Task extends mongoose.Document {
    startDate: Date,
    endDate: Date,
    value: Number,
    matter: String,
    state: String,
    client: String
}

//Task Schema to establish the properties of the tasks collection on MongoDB 
const taskSchema: Schema = new Schema({
    startDate: { type: Date,  required: true },
    endDate: { type: Date,  required: true },
    value: { type: Number, min: 10, required: true},
    matter: { type: String, minlength: 15, maxlength: 100, required: true },
    state: { type: String, enum: ['budgeted','accepted','completed'], default: 'budgeted' },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true}
});

export default model<Task>('Task',taskSchema);