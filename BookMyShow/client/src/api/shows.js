import { axiosInstance } from ".";

export const addShow = async (values) => {
  try {
    const response = await axiosInstance.post("/api/shows/add-show", values);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllShowsByTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-all-shows-by-theatre",
      { theatreId }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTheatresByMovie = async (values) => {
  try {
    const response = await axiosInstance.post(
      "/api/shows/get-all-theatres-by-movie",
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getShowById = async (showId) => {
  try {
    const response = await axiosInstance.post("/api/shows/get-show-by-id", {
      showId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateShow = async (values) => {
  try {
    const response = await axiosInstance.put("/api/shows/update-show", values);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteShow = async (showId) => {
  try {
    const response = await axiosInstance.post("/api/shows/delete-show", {
      showId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
