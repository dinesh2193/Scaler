import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, message } from "antd";
import { SetLoading } from "../../redux/loaderSlice";
import { getMovieById } from "../../api/movies";
import { getAllTheatresByMovie } from "../../api/shows";
import moment from "moment";

function SingleMovie() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [date, setDate] = useState(
    searchParams.get("date") || moment().format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const movieResponse = await getMovieById(id);
      if (movieResponse.success) {
        setMovie(movieResponse.data);
      }

      const theatreResponse = await getAllTheatresByMovie({
        movie: id,
        date,
      });
      if (theatreResponse.success) {
        setTheatres(theatreResponse.data);
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
  }, [date]);

  return (
    movie && (
      <div>
        <div className="d-flex single-movie-div" style={{ gap: "1rem" }}>
          <img
            src={movie.poster}
            alt={movie.title}
            className="single-movie-img flex-shrink-0"
            style={{
              width: 200,
              height: 300,
              objectFit: "cover",
              borderRadius: 8,
              marginRight: "1rem",
            }}
          />
          <div className="movie-title-details">
            <h1>{movie.title}</h1>
            <p className="movie-data">
              Language: <span>{movie.language}</span>
            </p>
            <p className="movie-data">
              Genre: <span>{movie.genre}</span>
            </p>
            <p className="movie-data">
              Release Date:{" "}
              <span>{moment(movie.releaseDate).format("MM-DD-YYYY")}</span>
            </p>
            <p className="movie-data">
              Duration: <span>{movie.duration} Mins</span>
            </p>
            <p>{movie.description}</p>
          </div>
        </div>

        <hr />

        <div className="d-flex" style={{ alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <label>Choose Date:</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ maxWidth: 200 }}
          />
        </div>

        {theatres.length === 0 && (
          <p>No shows available for this date.</p>
        )}

        {theatres.map((theatre) => (
          <div key={theatre._id} style={{ marginBottom: "1.5rem" }}>
            <div className="show-name">
              <h3>{theatre.name}</h3>
              <span>{theatre.address}</span>
            </div>
            <ul className="show-ul">
              {theatre.shows.map((show) => (
                <li
                  key={show._id}
                  onClick={() => navigate(`/book-show/${show._id}`)}
                >
                  {show.time}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  );
}

export default SingleMovie;
