import { Modal, Button } from "antd"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ isModalImageOpen },
    { handleCancelModalImage },
    { nameInImageModal },
    { saleStaffInImageModal },
    { paymentTypeInImageModal },
    { totalAmountInImageModal }) => {
    return <Modal
        title="THÔNG TIN HÌNH ẢNH"
        open={isModalImageOpen}
        onCancel={handleCancelModalImage}

        footer={[
            <Button key="back" onClick={handleCancelModalImage}>
                Đóng
            </Button>,
            <Button type="primary">
                Tải ảnh xuống
            </Button>,
            <Button type="primary">
                Gửi hình ảnh
            </Button>,
        ]}
    >
        <div className="modal--image">
            <div className="modal--image__item">
                <p>Tên hàng: <span>{nameInImageModal}</span></p>
                <p>NVKD: <span>{saleStaffInImageModal}</span></p>
            </div>
            <div className="modal--image__item">
                <p>Hình thức thu tiền: <span>{paymentTypeInImageModal}</span></p>
                <p>Số tiền: <span>{totalAmountInImageModal}</span></p>
            </div>
            <div className="modal--image__item">
                <label for="file">Tải hình ảnh</label>
                <input type="file" name="file" id="file" />
            </div>
        </div>
    </Modal>
}