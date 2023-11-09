import { Modal, Form, Input, Button } from "antd"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ checkCreateNew },
    { isOpenModal },
    { handelCancelModal },
    { formInforDriver },
    { handleOkDriver }) => {
    return <Modal
        title={checkCreateNew ? 'TẠO MỚI TÀI XẾ' : 'CẬP NHẬT TÀI XẾ'}
        open={isOpenModal}
        onCancel={handelCancelModal}
        footer={[
            <Button key="back" onClick={handelCancelModal}>
                Đóng
            </Button>,
            <Button type="primary" htmlType="submit" form="formInforDriver">
                Gửi
            </Button>,
        ]}
        width="800px"
    >
        <Form
            name="basic"
            form={formInforDriver}
            autoComplete="off"
            onFinish={handleOkDriver}
            id="formInforDriver"
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
                <p className="form-create__input__item--special">Tên tài xế</p>
                <Form.Item
                    name="name"
                    style={{
                        width: "500px",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên tài xế",
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
                            message: "Vui lòng nhập số điện thoại tài xế",
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
                            message: "Vui lòng nhập địa chỉ của tài xế",
                        },
                    ]}
                >
                    <Input className="input" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">CMND/CCCD</p>
                <Form.Item
                    name="identity"
                    style={{
                        width: "500px",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập CMND/CCCD của tài xế",
                        },
                    ]}
                >
                    <Input className="input" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Bằng lái xe</p>
                <Form.Item
                    name="drivingLicense"
                    style={{
                        width: "500px",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập bằng lái xe của tài xế",
                        },
                    ]}
                >
                    <Input className="input" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Biển số xe</p>
                <Form.Item
                    name="licensePlate"
                    style={{
                        width: "500px",
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập biển số xe của tài xế",
                        },
                    ]}
                >
                    <Input className="input" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--basic">Tên công ty</p>
                <Form.Item
                    name="company"
                    style={{
                        width: "500px",
                    }}
                >
                    <Input className="input" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--basic">SĐT công ty</p>
                <Form.Item
                    name="companyPhone"
                    style={{
                        width: "500px",
                    }}
                >
                    <Input className="input" type="text"></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--basic">Thông tin chi tiết</p>
                <Form.Item
                    name="description"
                    style={{
                        width: "500px",
                    }}
                >
                    <Input className="input" type="text"></Input>
                </Form.Item>
            </div>
        </Form>
    </Modal>
}