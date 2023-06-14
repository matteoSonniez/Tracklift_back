const User = require("../models/user.model");
const Company = require("../models/company.model");
const Freelance = require("../models/freelance.model");
const sendEmail = require('../utils/sendMail');
const signJwt = require("../utils/signJwt");

//get user logged (base on token)
exports.getMe = async (req, res, next) => {
  try {
    //find user and populate freelance && company
    const me = await User.findById(req.userToken.body.id).populate([
      {
        path: "company",
        model: "Company",
        populate: 
          {
            path: "user",
            model: "User",
          }
      },
      {
        path: "worksite",
        model: "Worksite",
        populate: [
          {
            path: "build_owner",
            model: "Company",
          },
          {
            path: "contact_mo",
            model: "User",
          },
          {
            path: "ascensoriste",
            model: "Company",
          },
          {
            path: "contact_ascensoriste",
            model: "User",
          }
        ]
      }
    ]);
    if (!me) {
      const error = new Error("User not found")
      error.status = 404
      throw error;
    }
    //return user
    res.send({
      user: me,
      success: true
    });
  }
  catch (err) {
    next(err);
  }
}


exports.getMyFreelance = async (req, res, next) => {
  try {
    //find user and populate freelance && company
    const me = await Freelance.findById(req.body.freelance_id).populate([
      {
        path: "skills",
        model: "Skill",
      },
      {
        path: "activity",
        model: "Activity",
      },
      {
        path: "propositions",
        model: "Proposition",
      }
    ]);
    if (!me) {
      const error = new Error("Freelance not found")
      error.status = 404
      throw error;
    }
    //return user
    res.send({
      freelance: me,
      success: true
    });
  }
  catch (err) {
    next(err);
  }
}

/*
exports.updateMe = async (req, res, next) => {
  try {
    // Find user and update
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.userToken.body.id },
      { $set: req.body },
      { new: true }
    );

    // Update user's freelance, if it exists
    if (updatedUser.freelance) {
      const updatedFreelance = await Freelance.findOneAndUpdate(
        { _id: updatedUser.freelance },
        { $set: req.body.freelance },
        { new: true }
      ).populate([
            {
              path: "skills",
              model: "Skill",
            },
            {
              path: "activity",
              model: "Activity",
            },
      ]);
      updatedUser.freelance = updatedFreelance;
    }
    if (updatedUser.company) {
      const updatedCompany = await Company.findOneAndUpdate(
        { _id: updatedUser.company },
        { $set: req.body.company },
        { new: true }
      );
      updatedUser.company = updatedCompany;
    }

    // Return updated user
    res.send({
      success: true,
      user: updatedUser
    });
  } catch (err) {
    next(err)
  }
}
*/

exports.updateMe = async (req, res, next) => {
  try {
    // find user and update
    const userToModify = await User.findByIdAndUpdate(req.userToken.body.id, req.body, { new: true });
    if (!userToModify) {
      const error = new Error("User not found")
      error.status = 404
      throw error;
    }
    //return user
    res.send({
      success: true,
      user: userToModify
    });
  }
  catch (err) {
    next(err)
  }
}

//update logged user company (base on token)
exports.updateMyCompany = async (req, res, next) => {
  try {
    //find ID company of user
    const me = await User.findById(req.userToken.body.id).populate('company');
    //if user don't have a company
    if (!me.company) {
      const error = new Error("User don't have a company account")
      error.status = 404
      throw error;
    }
    //find copany and update
    const CompanyToModify = await Company.findByIdAndUpdate(me.company.id,
      req.body,
      { new: true, upsert: true });
    
      //return user
      return res.send({
        success: true,
        company: CompanyToModify
      });
  }
  catch (err) {
    next(err)
  }
}

//update logged user freelance (base on token)
exports.updateMyFreelance = async (req, res, next) => {
  try {
    //find ID freelance of user
    const me = await User.findById(req.userToken.body.id);
    //if user don't have a freelance account
    if (!me.freelance) {
      const error = new Error("User don't have a freelance account")
      error.status = 404
      throw error;
    }
    //find freelance and update
    const freelanceToUpdate = await Freelance.findById(me.freelance);
    if (!freelanceToUpdate) {
      const error = new Error("freelance not found")
      error.status = 404
      throw error;
    }
    if(req.body.rate) freelanceToUpdate.rate = req.body.rate;
    if (req.body.yearOfExperience) freelanceToUpdate.yearOfExperience = req.body.yearOfExperience;
    //if (req.body.skills) freelanceToUpdate.skills.push(req.body.skills);
    if (req.body.skills) freelanceToUpdate.skills = req.body.skills;
    if (req.body.activity) freelanceToUpdate.activity = req.body.activity;
    await freelanceToUpdate.save();
    //return user
    res.send({
      success: true,
      freelance: freelanceToUpdate
    });
  }
  catch (err) {
    next(err)
  }
}

// forgot password 
exports.forgotPassword = async (req, res, next) => {

  try {
    const email = req.body.email;
    if (!email) {
      const error = new Error("you must fill an email")
      error.status = 401
      throw error;
    }
    //create a specific token for reset password
    const tokenPassword = signJwt({ email: email });
    //send email to user
    sendEmail(email, "password reset", "", "Veuillez cliquer sur ce lien pour regénérer un nouveau mot de passe");
    //send token
    res.send({
      success: true,
      token: tokenPassword
    })
  }
  catch (err) {
    next(err);
  }

}

//reset password
exports.resetPassword = async (req, res, next) => {
  try {
    //find user
    const user = await User.findById(req.userToken.body.id);
    //update password property with new one
    console.log(user, "passssssssssssss")
    user.password = req.body.password;
    //save in DB
    await user.save();
    //send success message
    res.send({
      message: "password successfully updated",
      success: true
    })
  }
  catch (err) {
    next(err);
  }
}

//get one user (admin)
exports.getUser = async (req, res, next) => {
  try {
    //find user
    const user = await User.findById(req.params.id);
    if (!user) {
      const error = new Error("User not found")
      error.status = 404
      throw error;
    }
    // return user
    res.send({
      user: user,
      success: true
    });
  }
  catch (err) {
    next(err);
  }
}

// update user (admin)
exports.updateUser = async (req, res, next) => {
  try {
    // find user and update
    const userToModify = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userToModify) {
      const error = new Error("User not found")
      error.status = 404
      throw error;
    }
    //return user
    res.send({
      success: true,
      user: userToModify
    });
  }
  catch (err) {
    next(err)
  }
}

// delete user (admin)
exports.deleteUser = async (req, res, next) => {
  try {
    //find user and delete it
    const userToDelete = await findById(req.params.id);
    if (!userToDelete) {
      const error = new Error("User not found")
      error.status = 404
      throw error;
    }
    //return deleted user
    res.send({
      success: true,
      user: userToDelete
    })
  }
  catch (err) {
    next(err)
  }

}

//find all users (admin)
exports.getUsers = async (req, res, next) => {
  try {
    // find all users
    const users = await User.find();
    //return users
    res.send({
      success: true,
      users: users
    });
  }
  catch (err) {
    next(err)
  }
}