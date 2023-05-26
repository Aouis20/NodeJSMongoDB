const Operation = require("../models/operation.js");
const { default: mongoose } = require("mongoose");

exports.create = async (req, res) => {
  try {
    const operation = new Operation({
      ...req.body,
      amount: req.body.action === "credit" ? req.body.amount : req.body.amount * -1,
      user: req.auth.userId,
      account: req.params.account_id,
    });

    await operation.save();

    return res.status(200).json(operation);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while creating operation.",
    });
  }
};

exports.readLineFromAccount = async (req, res) => {
  try {
    const result = await Operation.aggregate([
      {
        $match: { account: req.accountId },
      },
      {
        $group: {
          _id: "$account",
          balance: { $sum: "$amount" },
          operations: { $push: "$$ROOT" },
        },
      },
    ]);

    const balance = result.length > 0 ? result[0].balance : 0;
    const operations = result.length > 0 ? result[0].operations : [];

    return res.status(200).json({ operations, balance });
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while deleting account.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    delete req.body.account;
    const newOperation = await Operation.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
      },
      { returnDocument: "after" }
    );

    if (!newOperation) {
      return res.status(404).json({ message: "Operation not found" });
    }

    return res.status(200).json(newOperation);
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while updating account.",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const operation = await Operation.findOneAndDelete({ _id: req.params.id });

    if (!operation) {
      return res.status(404).json({ message: "Operation not found" });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({
      error: err.message || "Some error occurred while deleting account.",
    });
  }
};