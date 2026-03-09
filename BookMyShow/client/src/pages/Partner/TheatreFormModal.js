import { Modal, Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loaderSlice";
import { addTheatre, updateTheatre } from "../../api/theatres";

const TheatreFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  formType,
  getData,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (formType === "add") {
        response = await addTheatre({ ...values, owner: user._id });
      } else {
        response = await updateTheatre({
          ...values,
          theatreId: selectedTheatre._id,
        });
      }
      if (response.success) {
        message.success(response.message);
        getData();
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      setSelectedTheatre(null);
      dispatch(SetLoading(false));
    } catch (err) {
      dispatch(SetLoading(false));
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={selectedTheatre}
        onFinish={onFinish}
      >
        <Form.Item
          label="Theatre Name"
          name="name"
          rules={[{ required: true, message: "Theatre name is required!" }]}
        >
          <Input placeholder="Enter theatre name" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Address is required!" }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Phone is required!" }]}
        >
          <Input type="number" placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required!" }]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Submit
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheatreFormModal;
