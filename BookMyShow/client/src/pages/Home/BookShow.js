import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { SetLoading } from "../../redux/loaderSlice";
import { getShowById } from "../../api/shows";
import { makePayment, bookShow } from "../../api/bookings";
import moment from "moment";

function BookShow() {
  const { showId } = useParams();
  const [searchParams] = useSearchParams();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await getShowById(showId);
      if (response.success) {
        setShow(response.data);
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  // Handle return from Stripe Checkout
  const handleStripeReturn = async () => {
    const sessionId = searchParams.get("session_id");
    const seatsParam = searchParams.get("seats");
    if (sessionId && seatsParam && user) {
      try {
        dispatch(SetLoading(true));
        const seats = seatsParam.split(",").map(Number);
        const bookingResponse = await bookShow({
          show: showId,
          user: user._id,
          seats,
          transactionId: sessionId,
        });
        if (bookingResponse.success) {
          message.success("Booking confirmed!");
          navigate("/");
        } else {
          message.error(bookingResponse.message);
        }
        dispatch(SetLoading(false));
      } catch (err) {
        dispatch(SetLoading(false));
        message.error(err.message);
      }
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);
    return (
      <ul className="seat-ul">
        {Array.from(Array(rows * columns).keys()).map((seatNum) => {
          const seatNumber = seatNum + 1;
          if (seatNumber > totalSeats) return null;
          let seatClass = "seat-btn";
          if (selectedSeats.includes(seatNumber)) seatClass += " selected";
          if (show.bookedSeats.includes(seatNumber)) seatClass += " booked";
          return (
            <li key={seatNumber}>
              <button
                className={seatClass}
                disabled={show.bookedSeats.includes(seatNumber)}
                onClick={() => {
                  if (selectedSeats.includes(seatNumber)) {
                    setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
                  } else {
                    setSelectedSeats([...selectedSeats, seatNumber]);
                  }
                }}
              >
                {seatNumber}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const handlePayment = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await makePayment({
        amount: selectedSeats.length * show.ticketPrice * 100,
        showId: show._id,
        seats: selectedSeats,
      });
      if (response.success) {
        window.location.href = response.data;
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

  useEffect(() => {
    if (show && user) {
      handleStripeReturn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, user]);

  return (
    show && (
      <div>
        <div className="d-flex" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <div className="show-details">
            <h3>
              {show.theatre.name} - {show.theatre.address}
            </h3>
            <p>
              Movie: <b>{show.movie.title}</b>
            </p>
            <p>
              Date: <b>{moment(show.date).format("MM-DD-YYYY")}</b> | Time:{" "}
              <b>{show.time}</b>
            </p>
          </div>
        </div>

        <hr />

        <div className="d-flex" style={{ justifyContent: "center", marginBottom: "1rem" }}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 600 }}>
            <div className="screen-div mb-3"></div>
            <p style={{ color: "#999" }}>Screen this side</p>
          </div>
        </div>

        <div className="d-flex" style={{ justifyContent: "center", marginBottom: "2rem" }}>
          {getSeats()}
        </div>

        {selectedSeats.length > 0 && (
          <div
            className="bottom-card d-flex max-width-600 mx-auto"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div>
              <p style={{ margin: 0 }}>
                Selected Seats: <span>{selectedSeats.join(", ")}</span>
              </p>
              <p style={{ margin: 0 }}>
                Total: <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
              </p>
            </div>
            <Button type="primary" onClick={handlePayment}>
              Pay Now
            </Button>
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;