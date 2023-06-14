const mongoose = require('mongoose');

const WasteTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('WasteType', WasteTypeSchema);
