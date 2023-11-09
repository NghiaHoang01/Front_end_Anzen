import { Modal, Button, Form, Input } from "antd";
// eslint-disable-next-line import/no-anonymous-default-export
export default (
  { checkCreate },
  { isModalCreateCustomerOpen },
  { handleCreateCustomerCancel },
  { formInforCustomer },
  { handleOkCustomer }
) => {
  return (
    <Modal
      title={checkCreate ? "Cập nhật Khách hàng" : "Tạo mới Khách hàng"}
      open={isModalCreateCustomerOpen}
      onCancel={handleCreateCustomerCancel}
      footer={[
        <Button key="back" onClick={handleCreateCustomerCancel}>
          Đóng
        </Button>,
        <Button type="primary" htmlType="submit" form="formInforCustomer">
          Gửi
        </Button>,
      ]}
      width="800px"
    >
      <Form
        name="basic"
        form={formInforCustomer}
        autoComplete="off"
        onFinish={handleOkCustomer}
        id="formInforCustomer"
      >
        <div className="form-create__input__item" style={{ display: "none" }}>
          <p className="form-create__input__item--special">id</p>
          <Form.Item
            name="id"
            style={{
              width: "500px",
            }}
          >
            <Input className="input" type="text"></Input>
          </Form.Item>
        </div>

        <div className="form-create__input__item">
          <p className="form-create__input__item--special">Tên khách hàng</p>
          <Form.Item
            name="name"
            style={{
              width: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người khách hàng",
              },
            ]}
          >
            <Input className="input" type="text"></Input>
          </Form.Item>
        </div>

        <div className="form-create__input__item">
          <p className="form-create__input__item--special">Số điện thoại</p>
          <Form.Item
            name="phone"
            style={{
              width: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}
          >
            <Input className="input" type="text"></Input>
          </Form.Item>
        </div>

        <div className="form-create__input__item">
          <p className="form-create__input__item--special">Địa chỉ</p>
          <Form.Item
            name="address"
            style={{
              width: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <Input className="input" type="text"></Input>
          </Form.Item>
        </div>

        <div className="form-create__input__item">
          <p className="form-create__input__item--special">
            Thông tin chi tiết
          </p>
          <Form.Item
            name="description"
            style={{
              width: "500px",
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin chi tiết",
              },
            ]}
          >
            <Input className="input" type="text"></Input>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
