const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  id_deppartement: {
    type: String,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
