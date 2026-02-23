export function validateUser(req, res, next) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const details = [];
  const user = { ...req.body, id: Date.now() };

  // name
  if (!user.name || typeof user.name !== "string" || user.name.trim().length === 0) {
    details.push({ field: "name", message: "Name is required" });
  } else if (user.name.trim().length < 2 || user.name.trim().length > 50) {
    details.push({ field: "name", message: "Name must be 2 to 50 characters" });
  }

  // email
  if (!user.email || typeof user.email !== "string" || user.email.trim().length === 0) {
    details.push({ field: "email", message: "Email is required" });
  } else if (!emailRegex.test(user.email.trim())) {
    details.push({ field: "email", message: "Email is invalid" });
  }

  // age optional
  if (user.age !== undefined) {
    if (typeof user.age !== "number" || !Number.isInteger(user.age)) {
      details.push({ field: "age", message: "Age must be an integer" });
    } else if (user.age < 13 || user.age > 120) {
      details.push({ field: "age", message: "Age must be between 13 and 120" });
    }
  }

  if (details.length > 0) {
    return res.status(400).json({
      error: { message: "Validation failed", details },
    });
  }

  // sanitize + pass along
  req.user = {
    id: user.id,
    name: user.name.trim(),
    email: user.email.trim(),
    ...(user.age !== undefined ? { age: user.age } : {}),
  };

  return next();
}

