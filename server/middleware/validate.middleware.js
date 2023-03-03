const validate = (schema) => async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({ err: error.details[0].message });
  }

  //Calling next Middleware
  next();
};

module.exports = validate;
