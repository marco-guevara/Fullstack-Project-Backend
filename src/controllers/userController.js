const allowedUserUpdateFields = [
  "firstName",
  "lastName",
  "address",
  "city",
  "postalCode",
  "country",
  "phone",
];

function formatUser(user) {
  return {
    userId: user.userId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    postalCode: user.postalCode,
    country: user.country,
    phone: user.phone,
  };
}

function getAllowedUpdates(body) {
  return allowedUserUpdateFields.reduce((updates, field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      updates[field] = body[field];
    }

    return updates;
  }, {});
}

async function getCurrentUser(req, res) {
  return res.status(200).json({
    user: formatUser(req.user),
  });
}

async function updateCurrentUser(req, res) {
  try {
    const updates = getAllowedUpdates(req.body);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid user fields were provided.",
      });
    }

    await req.user.update(updates);

    return res.status(200).json({
      message: "User updated successfully.",
      user: formatUser(req.user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to update user.",
      error: error.message,
    });
  }
}

export {
  getCurrentUser,
  updateCurrentUser,
};
