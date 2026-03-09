import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { SetLoading } from "../../redux/loaderSlice";
import { getAllBookings } from "../../api/bookings";
import moment from "moment";

function Profile() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await getAllBookings();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map((booking) => (
        <div key={booking._id} className="bottom-card mb-3">
          <div className="d-flex" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ marginTop: 0 }}>{booking.show?.movie?.title}</h3>
              <p style={{ margin: "4px 0" }}>
                Theatre: {booking.show?.theatre?.name} - {booking.show?.theatre?.address}
              </p>
              <p style={{ margin: "4px 0" }}>
                Date: {moment(booking.show?.date).format("MM-DD-YYYY")} | Time: {booking.show?.time}
              </p>
              <p style={{ margin: "4px 0" }}>
                Seats: {booking.seats.join(", ")}
              </p>
              <p style={{ margin: "4px 0" }}>
                Amount: Rs. {booking.seats.length * booking.show?.ticketPrice}
              </p>
              <p style={{ margin: "4px 0", color: "#999" }}>
                Transaction ID: {booking.transactionId}
              </p>
              <p style={{ margin: "4px 0", color: "#999" }}>
                Booked on: {moment(booking.createdAt).format("MM-DD-YYYY hh:mm A")}
              </p>
            </div>
            <img
              src={booking.show?.movie?.poster}
              alt={booking.show?.movie?.title}
              style={{ width: 100, height: 150, objectFit: "cover", borderRadius: 8 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
