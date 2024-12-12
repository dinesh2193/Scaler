const movieRouter = require("express").Router()
const Movie = require("../models/movieModel")
const {
  addMovie,
  getAllMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController")

// add a movie
movieRouter.post("/add-movie", addMovie)

// get all movies
movieRouter.get("/get-all-movies", getAllMovies)

// update a movie
movieRouter.put("/update-movie", updateMovie)

// delete a movie
movieRouter.put("/delete-movie", deleteMovie)

module.exports = movieRouter;

// api/movies/add-movie