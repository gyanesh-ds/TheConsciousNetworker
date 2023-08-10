const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const QuoteSchema = new mongoose.Schema({
  quote: { type: String },
  author: { type: String },
});

const quoteModel = new model("Quotes", QuoteSchema);
module.exports = quoteModel;
