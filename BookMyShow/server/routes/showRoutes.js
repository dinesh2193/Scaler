const showRouter = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  addShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
  updateShow,
  deleteShow,
} = require("../controllers/showController");

showRouter.post("/add-show", auth, addShow);
showRouter.post("/get-all-shows-by-theatre", auth, getAllShowsByTheatre);
showRouter.post("/get-all-theatres-by-movie", getAllTheatresByMovie);
showRouter.post("/get-show-by-id", auth, getShowById);
showRouter.put("/update-show", auth, updateShow);
showRouter.post("/delete-show", auth, deleteShow);

module.exports = showRouter;
