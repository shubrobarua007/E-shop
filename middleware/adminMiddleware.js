function adminMiddleware(req, res, next) {
  const role = req.user.role;
  console.log(role);
  if (role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "You are not admin",
    });
  }
}

module.exports = adminMiddleware;
