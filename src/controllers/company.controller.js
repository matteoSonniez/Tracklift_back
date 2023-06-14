const User = require("../models/user.model");
const Company = require("../models/company.model");

exports.createCompany = async (req, res, next) => {

    //get the user who want to register Company
    //console.log(req,"tokennnn");
    //const me = await User.findById(req.userToken.body.id);
    
    // create a new Company instance
    const newCompany = new Company({
      name: req.body.name,
      companyType: req.body.companyType,
      address: {
        city: req.body.address.city,
        zipCode: req.body.address.zipCode,
        street: req.body.address.street
      },
      user: req.body.usersId
    })
  
    try {
      // save company in DB
      const newCompanyToSave = await newCompany.save();
      if(req.body.usersId) {
        for(var i = 0; i < req.body.usersId.length; i++) {
          const one_user = await User.findById(req.body.usersId[i]);
          one_user.company = newCompanyToSave._id;
          await one_user.save();
        }
      }
      //me.company = newCompanyToSave._id;
      //await me.save();
      // return company
      res.send({
        success: true,
        message: "company successfully create",
        company: newCompanyToSave
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

  exports.getMyCompany = async (req, res, next) => {
    try {
      //find user and populate freelance && company
      const me = await User.findById(req.userToken.body.id).populate([
        {
          path: "company",
          model: "Company",
        }]);
      if (!me) {
        const error = new Error("User not found")
        error.status = 404
        throw error;
      }
      //return user
      res.send({
        company: me.company,
        success: true
      });
    }
    catch (err) {
      next(err);
    }
  }

  exports.getCompanys = async (req, res, next) => {
    try {
      // find all users
      const companys = await Company.find();
      //return users
      res.send({
        success: true,
        companys: companys
      });
    }
    catch (err) {
      next(err)
    }
  }

  exports.getOneCompany = async (req, res, next) => {
    try {
      
      const company = await Company.findById(req.params.id);
     
      res.send({
        success: true,
        company: company
      });
    }
    catch (err) {
      next(err)
    }
  }