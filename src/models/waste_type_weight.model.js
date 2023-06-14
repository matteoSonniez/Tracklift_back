const mongoose = require('mongoose');

const WasteTypeWeightSchema = mongoose.Schema({
  waste_type: {
    type: mongoose.Schema.Types.ObjectId, ref: 'WasteType'
  },
  waste_mass: {
    type: Number,
    required: true
  },
  elevator_weight: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('WasteTypeWeight', WasteTypeWeightSchema);
