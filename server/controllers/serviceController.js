const Service = require("../models/service");

// Cree
exports.createService = async (req, res) => {
  try {
    const { nom, id_deppartement } = req.body;
    const existingService = await Service.findOne({ nom });
    if (existingService) {
      return res.status(400).json({
        error: "Un service avec ce nom existe déjà. Le nom doit être unique.",
      });
    }
    const service = new Service({ nom, id_deppartement });
    await service.save();
    res
      .status(201)
      .json({ message: "service enregistrée avec succès", service });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de l'enregistrement de la service",
    });
  }
};

// Modification d'une service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, id_deppartement } = req.body;
    const service = await Service.findByIdAndUpdate(
      id,
      { nom, id_deppartement },
      { new: true }
    );
    if (!service) {
      return res.status(404).json({ error: "departement non trouvée" });
    }
    res.json({ message: "service modifiée avec succès", service });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la modification de la service",
    });
  }
};

// Affichage d'une service
exports.getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "service non trouvée" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération de la service",
    });
  }
};

// Affichage de la liste des service
exports.getAllService = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des services",
    });
  }
};

// Suppression d'une service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ error: "service non trouvée" });
    }
    res.json({ message: "service supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la suppression de la service",
    });
  }
};

// Recherche d'une service par nom
exports.searchService = async (req, res) => {
  try {
    const { nom } = req.query;
    const regex = new RegExp(nom, "i");
    const services = await Service.find({ nom: regex });

    if (services.length === 0) {
      return res.status(404).json({ error: "Aucune service trouvée" });
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la recherche des service",
    });
  }
};
