const WasteType = require("../models/waste_type.model");
const WasteTypeWeight = require("../models/waste_type_weight.model");

exports.createWasteType = async (req, res, next) => {

    // create a new Company instance
    const newWasteType = new WasteType({
        name: req.body.name
    })
  
    try {
      // save company in DB
      const newWasteTypeToSave = await newWasteType.save();
      const elevator_weights = [100, 150, 225, 300, 500, 630, 1000]
      if (req.body.varies_weight == true) {
        for(var i = 0; i <= 6; i++) {
          const newWasteTypeWeight = new WasteTypeWeight({
            waste_type: newWasteTypeToSave._id,
            waste_mass: req.body.all_weight[i],
            elevator_weight: elevator_weights[i]
          })
          const newWasteTypeWeightToSave = await newWasteTypeWeight.save();
        }
      } else {
        for(var i = 0; i <= 6; i++) {
          const newWasteTypeWeight = new WasteTypeWeight({
            waste_type: newWasteTypeToSave._id,
            waste_mass: req.body.waste_mass,
            elevator_weight: elevator_weights[i]
          })
          const newWasteTypeWeightToSave = await newWasteTypeWeight.save();
        }
      }
      res.send({
        success: true,
        message: "waste_type successfully create",
        waste_type: newWasteTypeToSave
      })
    }
    catch (err) {
      next(err);
    }
  }

  exports.getWasteTypes = async (req, res, next) => {
    try {
      // find all users
      const wasteTypes = await WasteType.find();
      //return users
      res.send({
        success: true,
        wastetypes: wasteTypes
      });
    }
    catch (err) {
      next(err)
    }
  }

  exports.getWasteTypeWeight = async (req, res, next) => {
    try {
      
      const wasteTypesWeight = await WasteTypeWeight.find( { waste_type: req.params.id } );
     
      res.send({
        success: true,
        wastetypesweight: wasteTypesWeight
      });
    }
    catch (err) {
      next(err)
    }
  }

