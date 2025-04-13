const asyncHandler = (func) => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

export { asyncHandler };
