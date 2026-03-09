import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { getAllTheatresByOwner } from "../../api/theatres";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import ShowModal from "./ShowModal";

function Partner() {
  const { user } = useSelector((state) => state.users);
  const [theatres, setTheatres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await getAllTheatresByOwner(user._id);
      if (response.success) {
        setTheatres(
          response.data.map((item) => ({ ...item, key: `theatre${item._id}` }))
        );
      }
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", dataIndex: "address" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, data) => (data.isActive ? "Approved" : "Pending / Blocked"),
    },
    {
      title: "Action",
      render: (text, data) => (
        <div>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setSelectedTheatre(data);
              setFormType("edit");
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedTheatre(data);
            }}
          >
            <DeleteOutlined />
          </Button>
          {data.isActive && (
            <Button
              onClick={() => {
                setSelectedTheatre(data);
                setIsShowModalOpen(true);
              }}
            >
              Shows
            </Button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (user) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <h1>Partner - Theatres</h1>
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theatre
        </Button>
      </div>
      <Table dataSource={theatres} columns={columns} />
      {isModalOpen && (
        <TheatreFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          theatre={selectedTheatre}
        />
      )}
    </div>
  );
}

export default Partner;
