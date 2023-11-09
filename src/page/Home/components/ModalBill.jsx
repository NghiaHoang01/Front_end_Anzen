import { Button, Modal, Table } from "antd"
import TableItem from "./tableItem"
import generateColumnInforProduct from "./columnInforProduct"
import generateColumnDirver from "./columnsDriver"

const columnsProduct = generateColumnInforProduct()

const columnDriver = generateColumnDirver()

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ isModalBillOpen },
    { handleCancelModalBill },
    { handelDownloadAccounting },
    { handleDownloadReceipt },
    { id },
    { code },
    { saleStaff },
    { saleStaffPhone },
    { shipper },
    { consignee },
    { fromAddress },
    { toAddress },
    { shipperPhone },
    { consigneePhone },
    { deliveryOrderDetails },
    { totalAmount },
    { paymentType },
    { receiveType },
    { sendType },
    { tabelPrice },
    { freightFees },
    { transborderFees },
    { receivingFees },
    { otherFees },
    { ladingInfos }) => {
    return <Modal
        title="BIÊN NHẬN VẬN CHUYỂN"
        open={isModalBillOpen}
        onCancel={handleCancelModalBill}
        className="modal--export"
        width={1000}
        footer={[
            <Button key="back" onClick={handleCancelModalBill}>
                Đóng
            </Button>,
            <Button type="primary" onClick={() => handelDownloadAccounting(id, code)}>
                Tải xuống bản kế toán
            </Button>,
            <Button type="primary" onClick={() => handleDownloadReceipt(id, code)}>
                Tải xuống vận đơn
            </Button>,
        ]}
    >
        <div className="modal--bill__row">
            <p>MVĐ: <span>{code}</span></p>
            <div className="modal--bill__row__item">
                <p>Nhân viên kinh doanh: <span>{saleStaff}</span></p>
                <p>SĐT: <span>{saleStaffPhone}</span></p>
            </div>
        </div>

        <div className="modal--bill__row">
            <p>Người gửi: <span>{shipper}</span></p>
            <p>Người nhận: <span>{consignee}</span></p>
        </div>

        <div className="modal--bill__row">
            <p>Địa chỉ gửi: <span>{fromAddress}</span></p>
            <p>Địa chỉ nhận: <span>{toAddress}</span></p>
        </div>

        <div className="modal--bill__row">
            <p>Số điện thoại gửi: <span>{shipperPhone}</span></p>
            <p>Số điện thoại nhận: <span>{consigneePhone}</span></p>
        </div>

        <p className="describe">Hai bên thống nhất lượng vận chuyển như sau</p>

        <Table className="home__data table--bill"
            dataSource={deliveryOrderDetails}
            columns={columnsProduct}
            size='middle'
        />

        <div className="modal--bill__row">
            <p>Cước vận chuyển: <span>{totalAmount}</span></p>
            <p>Hình thức thanh toán: <span>{paymentType}</span></p>
        </div>

        <div className="modal--bill__row">
            <p>Hình thức nhận hàng: <span>{receiveType}</span></p>
            <p>Hình thức giao hàng: <span>{sendType}</span></p>
        </div>

        <div className="modal--bill__title">
            <p>Giá bán</p>
        </div>

        {
            tabelPrice
        }

        <div className="modal--bill__title">
            <p>Giá mua</p>
        </div>

        <TableItem title='Trung chuyển' lstData={freightFees} />

        <TableItem title='Phí nhận hàng' lstData={transborderFees} />

        <TableItem title='Phí bo giao hàng' lstData={receivingFees} />

        <TableItem title='Phí khác' lstData={otherFees} />

        <div className="modal--bill__title">
            <p>Thông tin tài xế</p>
        </div>

        <Table className="home__data table--bill"
            dataSource={ladingInfos}
            columns={columnDriver}
            size='middle'
        />
    </Modal>
}