import { Modal, Button } from "antd"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ checkCreate },
    { isModalEditOpen },
    { handleCancel },
    { editForm },
    { productForm }) => {
    return <Modal title={checkCreate ? "Tạo đơn mới" : "Sửa đơn"}
        open={isModalEditOpen}
        onCancel={handleCancel}
        width={680}
        footer={[
            <Button key="back" onClick={handleCancel}>
                Đóng
            </Button>,
            <Button type="primary" htmlType="submit" form="formModal">
                Gửi
            </Button>,
        ]}>

        {/* form edit */}

        {
            editForm
        }

        {/* form product */}
        {
            productForm
        }
    </Modal>
}