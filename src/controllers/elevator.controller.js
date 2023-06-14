const User = require("../models/user.model");
const Company = require("../models/company.model");
const Worksite = require("../models/worksite.model");
const Elevator = require("../models/elevator.model");

exports.createElevator = async (req, res, next) => {

    // create a new Company instance
    const newElevator = new Elevator({
      nbr_device: req.body.nbr_device,
      nbr_level: req.body.nbr_level,
      maker: req.body.maker,
      charge_utile: req.body.charge_utile,
      worksite: req.body.worksite
    })
  
    try {
      // save company in DB
      const newElevatorToSave = await newElevator.save();

      //ajout du chantier a la company maitre d'ouvrage
      const worksite = await Worksite.findById(req.body.worksite);
      worksite.elevator.push(newElevatorToSave._id);
      await worksite.save();

      res.send({
        success: true,
        message: "worksite successfully create",
        elevator: newElevatorToSave
      })
    }
    catch (err) {
      next(err);
    }
  }


  exports.updateElevator = async (req, res, next) => {
    //
    try {
      // find and update in DB
      const elevatorToUpdate = await Elevator.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!elevatorToUpdate) {
        const error = new Error("elevator not found")
        error.status = 404
        throw error;
      }
      //return updated skill
      res.send({
        success: true,
        message: "elevator successfully updated",
        elevator: elevatorToUpdate
      })
    }
    catch(err) {
      next(err)
    }
  }

  exports.removeElevator = async (req, res, next) => {
    try {
      const elevatorToDelete = await Elevator.findByIdAndRemove(req.params.id);
      if (!elevatorToDelete) {
        const error = new Error("elevator not found");
        error.status = 404;
        throw error;
      }
  
      await Worksite.updateMany({ elevator: req.params.id }, { $pull: { elevator: req.params.id } });
  
      res.send({
        success: true,
        message: "elevator successfully deleted",
        elevator: elevatorToDelete
      });
    } catch (err) {
      next(err);
    }
  };

  exports.getElevators = async (req, res, next) => {
    try {
      const elevators = await Elevator.find();
      
      res.send({
        success: true, 
        elevators:elevators
      })
    }
    catch (err) {
      next(err);
    }
  }