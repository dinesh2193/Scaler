import { axiosInstance } from ".";

export const makePayment = async (values) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/make-payment",
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const bookShow = async (values) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookings/book-show",
      values
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookings = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/bookings/get-all-bookings"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
