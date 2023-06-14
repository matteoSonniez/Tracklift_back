const User = require("../models/user.model");
const Company = require("../models/company.model");
const Worksite = require("../models/worksite.model");

exports.createWorksite = async (req, res, next) => {

    // create a new Company instance
    const newWorksite = new Worksite({
      name: req.body.name,
      address: {
        city: req.body.address.city,
        zipCode: req.body.address.zipCode,
        street: req.body.address.street
      },
      build_owner: req.body.build_owner,
      contact_mo: req.body.contact_mo,
      ascensoriste: req.body.ascensoriste,
      contact_ascensoriste: req.body.contact_ascensoriste
    })
  
    try {
      // save company in DB
      const newWorksiteToSave = await newWorksite.save();

      //ajout du chantier a la company maitre d'ouvrage
      const build_owner = await Company.findById(req.body.build_owner);
      build_owner.worksite.push(newWorksiteToSave._id);
      await build_owner.save();

      //ajout du chantier a la company maitre d'ouvrage
      const contact_mo = await User.findById(req.body.contact_mo);
      contact_mo.worksite.push(newWorksiteToSave._id);
      await contact_mo.save();

      //ajout du chantier a la company maitre d'ouvrage
      const ascensoriste = await Company.findById(req.body.ascensoriste);
      ascensoriste.worksite.push(newWorksiteToSave._id);
      await ascensoriste.save();

      //ajout du chantier a la company maitre d'ouvrage
      const contact_ascensoriste = await User.findById(req.body.contact_ascensoriste);
      contact_ascensoriste.worksite.push(newWorksiteToSave._id);
      await contact_ascensoriste.save();

      res.send({
        success: true,
        message: "worksite successfully create",
        worksite: newWorksiteToSave
      })
    }
    catch (err) {
      next(err);
    }
  }


  exports.addUserToCompany = async (req, res, next) => {
    try {
      //update mission
      const companyToUpdate = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
      //return mission updated
      res.send ({
        success: true,
        message:"company successfully updated",
        mission: companyToUpdate
      });
    }
    catch (err) {
      next(err);
    }
  
  }

  exports.getWorkSites = async (req, res, next) => {
    try {
      // find all users
      const worksites = await Worksite.find();
      //return users
      res.send({
        success: true,
        worksites: worksites
      });
    }
    catch (err) {
      next(err)
    }
  }