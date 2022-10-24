const validateNewUser = (req) => {
  if (
    req.body.username &&
    req.body.firstname &&
    req.body.lastname &&
    req.body.email &&
    req.body.password
  ) {
    return true;
  } else {
    return false;
  }
};
const validateNewFamily = (req) => {
  if (req.body.name && req.body.parent) {
    return true;
  } else {
    return false;
  }
};

const validateUpdateUser = (req) => {
  if (
    req.body.username !== "" &&
    req.body.firstname !== "" &&
    req.body.lastname !== "" &&
    req.body.email !== "" &&
    req.body.password !== ""
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { validateNewUser, validateUpdateUser };
