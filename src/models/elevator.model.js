const mongoose = require('mongoose');

const ElevatorSchema = mongoose.Schema({
  nbr_device: {
    type: Number,
    required: true
  },
  nbr_level: {
    type: Number,
    required: true
  },
  maker: {
    type: String,
    required: true
  },
  charge_utile: {
    type: Number,
    required: true
  },
  worksite: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Worksite'
  },
  /*
   audit: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Company',
    required: true
  },
  */
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Elevator', ElevatorSchema);
