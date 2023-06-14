const mongoose = require('mongoose');

const workSiteSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    minLength: 2,
    lowercase: true,
    required: true
  },
  address: {
    street: {
      type: String,
      maxLength: 50,
      minLength: 2,
      lowercase: true,
      required: true
    },
    zipCode: {
      type: Number,
      maxLength: 5,
      minLength: 5,
      required: true
    },
    city: {
      type: String,
      maxLength: 50,
      minLength: 2,
      lowercase: true,
      required: true
    }
  },
  build_owner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Company',
    required: true
  },
  contact_mo: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  ascensoriste: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Company',
    required: true
  },
  contact_ascensoriste: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  elevator: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Elevator'
  }]
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Worksite', workSiteSchema);
