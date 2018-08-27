import mongoose from 'mongoose';
// import Albums from './models/albums.js';
const Schema = mongoose.Schema;

const bandSchema = new Schema({
  name:  {type: String, required: true},
});

export default mongoose.model('Band', bandSchema);