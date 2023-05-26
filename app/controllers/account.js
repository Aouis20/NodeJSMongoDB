const Account = require("../models/account.js");

exports.create = async (req, res) => {
  try {
    const { bankName, customName } = req.body;
    const account = new Account({
      bankName,
      customName,
      user: req.auth.userId,
    });

    await account.save();

    return res.status(201).json(account);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while creating account.",
    });
  }
};

exports.update = async (req, res) => {
  const { bankName, customName } = req.body;

  try {
    const newAccount = await Account.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        bankName,
        customName,
      },
      { returnDocument: "after" }
    );

    if (!newAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (req.auth.userId !== newAccount.user.valueOf()) {
      return res.status(403).json({ message: "This is not your account" });
    }

    return res.status(200).json(newAccount);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while updating account.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      _id: req.params.id,
      user: req.auth.userId,
    });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while deleting account.",
    });
  }
};

exports.get = async (req, res) => {
    try {
        const account = await Account.findOne({ _id: req.params.id })
        if (!account) {
            return res.status(404).json({
                error: "Account not found",
            });
        }
        return res.status(200).json(account)
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }
};

