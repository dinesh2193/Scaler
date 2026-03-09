import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, message, Row, Col } from "antd";
import { SetLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movies";
import moment from "moment";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <Input
        placeholder="Search for movies"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20, maxWidth: 400 }}
      />
      <Row gutter={[20, 20]}>
        {filteredMovies.map((movie) => (
          <Col
            key={movie._id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            onClick={() =>
              navigate(
                `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
              )
            }
            style={{ cursor: "pointer" }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <h3 style={{ marginBottom: 0, marginTop: 8 }}>{movie.title}</h3>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
