const Show = require("../models/showModel");

const addShow = async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllShowsByTheatre = async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getAllTheatresByMovie = async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = await Show.find({ movie, date })
      .populate("theatre")
      .sort({ time: 1 });

    // Group shows by theatre
    const uniqueTheatres = [];
    const theatreIds = new Set();

    shows.forEach((show) => {
      if (show.theatre && !theatreIds.has(show.theatre._id.toString())) {
        theatreIds.add(show.theatre._id.toString());
        const theatreShows = shows.filter(
          (s) =>
            s.theatre && s.theatre._id.toString() === show.theatre._id.toString()
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: theatreShows,
        });
      }
    });

    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: uniqueTheatres,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      message: "Show fetched successfully",
      data: show,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const updateShow = async (req, res) => {
  try {
    const show = await Show.findByIdAndUpdate(req.body.showId, req.body, {
      new: true,
    });
    if (!show) {
      return res.status(404).send({
        success: false,
        message: "Show not found",
      });
    }
    res.send({
      success: true,
      message: "Show updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const deleteShow = async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addShow,
  getAllShowsByTheatre,
  getAllTheatresByMovie,
  getShowById,
  updateShow,
  deleteShow,
};
