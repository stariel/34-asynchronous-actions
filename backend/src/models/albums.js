import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title:  {type: String, required: true},
  artist: {type: String, required: true},
  releaseYear: { type: Number, max: 2018 },
  band: { type: Schema.Types.ObjectId, ref: 'Band'},
});

export default mongoose.model('Album', albumSchema);