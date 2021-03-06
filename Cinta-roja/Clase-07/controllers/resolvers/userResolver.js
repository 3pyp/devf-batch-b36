const { User } = require("../../modules");
const jwt = require("jsonwebtoken");
const KEY = "QWERTY123";

module.exports = {

  getSingleUser: userid =>{
    return new Promise((resolve, reject)=>{
      User.findById(userid, (err,user)=>{
        !err ? resolve(user) : reject(err);
      })
    })
  }


  // getSingleUser: userid => {
  //   return new Promise((resolve, reject) => {
  //     User.findById(userid, (err, user) => {
  //       !err ? resolve(user) : reject(err);
  //     });
  //   });
  // },
  newUser: userData => {
    return new Promise((resolve, reject) => {
      const {
        name,
        age,
        last_name,
        gender,
        is_active,
        email,
        password
      } = userData;

      const newUser = User({
        name,
        last_name,
        age,
        email,
        password,
        gender
      });
      newUser.save((err, user) => {
        !err ? resolve(user) : reject(err);
      });
    });
  },
  getAllUser: () => {
    return new Promise((resolve, reject) => {
      User.find({ is_active: true }, (err, users) => {
        !err ? resolve(users) : reject(err);
      });
    });
  },
  modifyThisUser: (userid, body) => {
    return new Promise((resolve, reject) => {
      const { name, age, last_name, gender, is_active, email, password } = body;

      const newData = {
        name,
        last_name,
        age,
        email,
        password,
        gender
      };

      User.findByIdAndUpdate(
        userid,
        { $set: newData },
        { new: true },
        (err, user) => {
          !err ? resolve(user) : reject(err);
        }
      );
    });
  },
  deleteThisUser: userid => {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(
        id,
        { $set: { is_active: false } },
        { new: true },
        err => {
          !err ? resolve("The User has been exterminated") : reject(err);
        }
      );
    });
  },
  findUserEmail: email => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, user) => {
        !err ? resolve(user) : reject(err);
      });
    });
  },
  validatePassword: (user, password) => {
    return new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch) {
          !err ? resolve(user) : reject(err);
        } else {
          reject(err);
        }
      });
    });
  },
  generateToken: user => {
    const userPayload = {
      id: user._id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 1000
    };
    return jwt.sign(userPayload, KEY);
  }
};
