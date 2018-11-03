import mongoose, { Schema } from 'mongoose';

const PyramidData = new Schema({
  phrase: {
    type: String,
    require: true,
  },
  finalValue: {
    type: Number,
    require: true,
  },
});


export default mongoose.model('PyramidData', PyramidData);
