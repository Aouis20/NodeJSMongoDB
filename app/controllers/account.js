const {
    Account
} = require("../models");

exports.create = async (req, res) => {
    try {
        const account = new Account({
            ...req.body,
            user: req.auth.userId
        })

        await account.save()
        return res.status(200).json(account)
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }
};

exports.update = async (req, res) => {
    try {
        const newAccount = new Account.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                ...req.body
            },
            { returnDocument: "after"}
        )

        if (!account) {
            return res.status(404).json({
                error: "Account not found",
            });
        }

        return res.status(200).json(newAccount)
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }
};

exports.delete = async (req, res) => {
    try {
        await Account.deleteOne({ _id: req.params.id })
        return res.status(204).send()
    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
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

