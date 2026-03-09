const theatreRouter = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  addTheatre,
  getAllTheatres,
  getAllTheatresByOwner,
  updateTheatre,
  deleteTheatre,
} = require("../controllers/theatreController");

// Add a theatre (Partner)
theatreRouter.post("/add-theatre", auth, addTheatre);

// Get all theatres (Admin)
theatreRouter.get("/get-all-theatres", auth, getAllTheatres);

// Get theatres by owner (Partner)
theatreRouter.get("/get-all-theatres-by-owner/:ownerId", auth, getAllTheatresByOwner);

// Update a theatre (Partner/Admin)
theatreRouter.put("/update-theatre", auth, updateTheatre);

// Delete a theatre (Partner)
theatreRouter.delete("/delete-theatre/:theatreId", auth, deleteTheatre);

module.exports = theatreRouter;
