import { Button, Form, Select, Modal, Input } from "antd"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ isModalChangeRoleOpen },
    { handleModalChangeRoleCancel },
    { formChangeRole },
    { handelChangeRoleFinish },
    { listRole }) => {
    return <Modal
        title={'THAY ĐỔI QUYỀN'}
        open={isModalChangeRoleOpen}
        onCancel={handleModalChangeRoleCancel}
        footer={[
            <Button key="back" onClick={handleModalChangeRoleCancel}>
                Đóng
            </Button>,
            <Button type="primary" htmlType="submit" form="formChangeRole">
                Gửi
            </Button>,
        ]}
    >
        <Form
            name="basic"
            id="formChangeRole"
            form={formChangeRole}
            autoComplete="off"
            onFinish={handelChangeRoleFinish}
        >
            <div className="form-create__input__item center" style={{ display: "none" }}>
                <p className="form-create__input__item--special basic">ID: </p>
                <Form.Item
                    name="id"
                    style={{
                        width: "300px"
                    }}
                >
                    <Input className="input" type="text" ></Input>
                </Form.Item>
            </div>

            <div className="form-create__input__item center">
                <p className="form-create__input__item--special basic">Quyền: </p>
                <Form.Item
                    name="roleName"
                    style={{
                        width: "300px"
                    }}
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