import { Modal, Button, Form, Input, Select } from "antd";
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ isModalCreateNewOpen },
    { handleModalCreateNewCancel },
    { formCreateNew },
    { handelCreateNewFinish },
    { containsUppercase },
    { containsLowercase },
    { containsSpecialCharacter },
    { listRole }) => {
    return <Modal
        title={'TẠO MỚI TÀI KHOẢN'}
        open={isModalCreateNewOpen}
        onCancel={handleModalCreateNewCancel}
        width="800px"
        footer={[
            <Button key="back" onClick={handleModalCreateNewCancel}>
                Đóng
            </Button>,
            <Button type="primary" htmlType="submit" form="formCreateNew">
                Gửi
            </Button>,
        ]}
    >
        <Form
            name="basic"
            form={formCreateNew}
            id="formCreateNew"
            autoComplete="off"
            onFinish={handelCreateNewFinish}
        >
            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Tên nhân viên: </p>
                <Form.Item
                    name="name"
                    style={{
                        width: "500px"
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên nhân viên!',
                        },
                    ]}
                >
                    <Input className="input" type="text" ></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Tên đầy đủ: </p>
                <Form.Item
                    name="fullName"
                    style={{
                        width: "500px"
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đầy đủ của nhân viên!',
                        },
                    ]}
                >
                    <Input className="input" type="text" ></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Số điện thoại: </p>
                <Form.Item
                    name="phoneNumber"
                    style={{
                        width: "500px"
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại của nhân viên!',
                        },
                    ]}
                >
                    <Input className="input" type="text" ></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Địa chỉ: </p>
                <Form.Item
                    name="address"
                    style={{
                        width: "500px"
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ của nhân viên!',
                        },
                    ]}
                >
                    <Input className="input" type="text" ></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Tên đăng nhập: </p>
                <Form.Item
                    name="userName"
                    style={{
                        width: "500px"
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên đăng nhập của nhân viên!',
                        },
                    ]}
                >
                    <Input className="input" type="text" ></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Mật khẩu: </p>
                <Form.Item
                    name="password"
                    style={{
                        width: "500px"
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value.length <= 9 ||
                                    !containsUppercase(value) ||
                                    !containsLowercase(value) ||
                                    containsSpecialCharacter(value)) {
                                    return Promise.reject(new Error('Mật khẩu phải có ít nhất 9 kí tư, Chữ hoa, Chữ thường, và không có kí tự đặc biệt!'));

                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input.Password className="input"></Input.Password>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Nhập lại mật khẩu: </p>
                <Form.Item
                    name="repeatPassword"
                    style={{
                        width: "500px"
                    }}
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Nhập lại mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu không trùng!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password className="input" ></Input.Password>
                </Form.Item>
            </div>

            <div className="form-create__input__item">
                <p className="form-create__input__item--special">Quyền: </p>
                <Form.Item
                    name="roleName"
                    style={{
                        width: "500px"
                    }}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn quyền!',
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn quyền"
                        options={listRole}
                    />
                </Form.Item>
            </div>
        </Form>
    </Modal>
}