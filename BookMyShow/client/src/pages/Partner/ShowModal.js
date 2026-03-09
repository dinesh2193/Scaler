import React, { useEffect, useState } from "react";
import {
  Modal,
  Table,
  Button,
  Form,
  Input,
  Select,
  message,
  Col,
  Row,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movies";
import {
  addShow,
  getAllShowsByTheatre,
  updateShow,
  deleteShow,
} from "../../api/shows";
import moment from "moment";

const ShowModal = ({ isShowModalOpen, setIsShowModalOpen, theatre }) => {
  const [view, setView] = useState("table");
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const showResponse = await getAllShowsByTheatre(theatre._id);
      if (showResponse.success) {
        setShows(
          showResponse.data.map((item) => ({
            ...item,
            key: `show${item._id}`,
          }))
        );
      }
      const movieResponse = await getAllMovies();
      if (movieResponse.success) {
        setMovies(movieResponse.data);
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (selectedShow) {
        response = await updateShow({
          ...values,
          showId: selectedShow._id,
          theatre: theatre._id,
        });
      } else {
        response = await addShow({ ...values, theatre: theatre._id });
      }
      if (response.success) {
        message.success(response.message);
        getData();
        setView("table");
        setSelectedShow(null);
      } else {
        message.error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  const handleDelete = async (showId) => {
    try {
      dispatch(SetLoading(true));
      const response = await deleteShow(showId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  const columns = [
    { title: "Show Name", dataIndex: "name" },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => moment(text).format("MM-DD-YYYY"),
    },
    { title: "Time", dataIndex: "time" },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, data) => data.movie?.title || "N/A",
    },
    { title: "Ticket Price", dataIndex: "ticketPrice" },
    { title: "Total Seats", dataIndex: "totalSeats" },
    {
      title: "Booked Seats",
      dataIndex: "bookedSeats",
      render: (text, data) => data.bookedSeats?.length || 0,
    },
    {
      title: "Action",
      render: (text, data) => (
        <div>
          <Button
            onClick={() => {
              setSelectedShow({
                ...data,
                date: moment(data.date).format("YYYY-MM-DD"),
                movie: data.movie?._id,
              });
              setView("form");
            }}
          >
            <EditOutlined />
          </Button>
          <Button onClick={() => handleDelete(data._id)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      title={`Shows - ${theatre.name}`}
      open={isShowModalOpen}
      onCancel={() => {
        setIsShowModalOpen(false);
        setSelectedShow(null);
        setView("table");
      }}
      width={1200}
      footer={null}
    >
      <div className="d-flex justify-content-between mb-3">
        <h3>{view === "table" ? "Shows" : selectedShow ? "Edit Show" : "Add Show"}</h3>
        {view === "table" && (
          <Button
            onClick={() => {
              setView("form");
              setSelectedShow(null);
            }}
          >
            Add Show
          </Button>
        )}
      </div>

      {view === "table" && <Table dataSource={shows} columns={columns} />}

      {view === "form" && (
        <Form
          layout="vertical"
          initialValues={selectedShow}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Show name is required!" }]}
              >
                <Input placeholder="Enter show name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Date is required!" }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Time is required!" }]}
              >
                <Input type="time" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Movie"
                name="movie"
                rules={[{ required: true, message: "Movie is required!" }]}
              >
                <Select
                  placeholder="Select a movie"
                  options={movies.map((movie) => ({
                    value: movie._id,
                    label: movie.title,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Ticket price is required!" },
                ]}
              >
                <Input type="number" placeholder="Enter ticket price" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Total seats is required!" },
                ]}
              >
                <Input type="number" placeholder="Enter total seats" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              {selectedShow ? "Update Show" : "Add Show"}
            </Button>
            <Button
              className="mt-3"
              block
              onClick={() => {
                setView("table");
                setSelectedShow(null);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ShowModal;