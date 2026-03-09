import { axiosInstance } from ".";

export const addTheatre = async (values) => {
  try {
    const response = await axiosInstance.post("/api/theatres/add-theatre", values);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTheatresByOwner = async (ownerId) => {
  try {
    const response = await axiosInstance.get(
      `/api/theatres/get-all-theatres-by-owner/${ownerId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTheatre = async (values) => {
  try {
    const response = await axiosInstance.put("/api/theatres/update-theatre", values);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTheatre = async (theatreId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/theatres/delete-theatre/${theatreId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
