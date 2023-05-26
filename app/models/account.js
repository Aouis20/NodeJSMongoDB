const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user field is required."],
  },
  bankName: {
    type: String,
    required: [true, "The bankName field is required."],
  },
  customName: {
    type: String,
    maxlength: [50, "The custom name can't exceed 50 characters, got {VALUE}."],
    required: [true, "The customName field is required."],
  },
  lastUpdated: {
    type: Date,
  },
});

accountSchema.pre("save", async function (next) {
    try {
        this.lastUpdated = Date.now()
        next()
    } catch (e) {
        next(error)
    }
})

accountSchema.pre("findOneAndUpdate", function (next) {
    this.set({lastUpdated: Date.now()});
})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;