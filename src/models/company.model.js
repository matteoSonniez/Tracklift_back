const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
    minLength: 2,
    lowercase: true,
    required: true
  },
  companyType: {
    type: String,
    enum: ['ADMIN','MAITRE-OUVRAGE', 'ASCENSORISTE'],
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
  user: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  }],
  worksite: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Worksite',
    required: true
  }],
  elevator: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Elevator'
  }]
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Company', companySchema);
