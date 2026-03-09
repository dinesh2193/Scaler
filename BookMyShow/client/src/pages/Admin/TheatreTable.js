import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { getAllTheatres, updateTheatre } from "../../api/theatres";

function TheatreTable() {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await getAllTheatres();
      if (response.success) {
        setTheatres(
          response.data.map((item) => ({ ...item, key: `theatre${item._id}` }))
        );
      } else {
        message.error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(SetLoading(true));
      const response = await updateTheatre({
        theatreId: theatre._id,
        isActive: !theatre.isActive,
      });
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
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => data.owner?.name || "N/A",
    },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, data) => (data.isActive ? "Approved" : "Pending"),
    },
    {
      title: "Action",
      render: (text, data) => (
        <Button onClick={() => handleStatusChange(data)}>
          {data.isActive ? "Block" : "Approve"}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Table dataSource={theatres} columns={columns} />
    </div>
  );
}

export default TheatreTable;
