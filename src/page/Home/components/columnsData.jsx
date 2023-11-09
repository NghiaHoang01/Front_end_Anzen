import { Space, Tag, Popconfirm, } from 'antd'
import { QuestionCircleOutlined } from "@ant-design/icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ pagingSearch },
    { showModalBill },
    { showModalEdit },
    { handleDeleteDeliveryOrder },
    { showModalImage },
    { isShowAll }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
            disabled: true
        },
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: "center",
            width: 70,
            render: (_, record, index) => {
                return <p>{((pagingSearch.pageIndex - 1) * pagingSearch.pageSize) + index + 1}</p>
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'orderDate',
            key: 'orderDate',
            align: "center",
            width: 120,
            render: (_, record) => {
                const arr = record.orderDate.split("T")
                const dateArr = arr[0].split("-")
                const date = dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0]
                return (
                    <span>{date}</span>
                )
            }
        },
        {
            title: 'Số mã',
            dataIndex: 'code',
            key: 'code',
            align: "center",
            width: 110,
            render: (_, record) => <Tag className="tag" color="#f42323" onClick={() => showModalBill(record)}>
                {record.code}
            </Tag>
        },
        {
            title: 'NVKD',
            dataIndex: 'saleStaff',
            key: 'saleStaff',
        }, {
            title: 'Tên hàng',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Điểm nhận hàng',
            dataIndex: 'fromAddress',
            key: 'fromAddress',
        },
        {
            title: 'SĐT người gửi',
            dataIndex: 'shipperPhone',
            key: 'shipperPhone',
            hidden: isShowAll,
        },
        {
            title: 'Điểm giao hàng',
            dataIndex: 'toAddress',
            key: 'toAddress',
        },
        {
            title: 'SĐT người nhận',
            dataIndex: 'consigneePhone',
            key: 'consigneePhone',
            hidden: isShowAll,
        }, {
            title: 'Giá cước',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            textWrap: 'word-break',
            align: "center",
            hidden: isShowAll,
        }, {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            textWrap: 'word-break',
            align: "center",
            width: 110,
            render: (tag) => {
                let color = "#f42323"
                let title = "Đơn hàng tồn kho";
                if (tag === "New") {
                    color = "#0a7cff";
                    title = "Đơn mới";
                }
                else if (tag === "Gone") {
                    color = "#04aa6d";
                    title = "Đơn hàng đã đi";
                }

                return (
                    <Tag color={color} style={{ width: 30, height: 15, cursor: "pointer" }} className="tag" title={title}>
                    </Tag>
                )
            }
        },
        {
            title: 'HTTT',
            dataIndex: 'paymentType',
            key: 'paymentType',
            textWrap: 'word-break',
            align: "center",
            width: 100,
        },
        {
            title: 'Hoàn tất',
            dataIndex: 'isDone',
            key: 'isDone',
            textWrap: 'word-break',
            align: "center",
            width: 100,
            render: (_, record) => {
                let color = "#f42323"
                if (record.isDone) {
                    color = "#04aa6d";
                }
                return (
                    <Tag color={color} style={{ width: 30, height: 15 }} className="tag" title={color === "#04aa6d" ? "Đã hoàn tất" : "Chưa hoàn tất"}>
                    </Tag>
                )
            }
        }, {
            title: 'Thao tác',
            dataIndex: 'thaoTac',
            align: "center",
            width: 120,
            render: (_, record) => (
                <div>
                    <Space>
                        <i class="fa-solid fa-pen-to-square btnEdit" onClick={() => showModalEdit(record)}></i>

                        <Popconfirm
                            title="Bạn có đồng ý xóa?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            onConfirm={() => handleDeleteDeliveryOrder(record.id)}
                        >
                            <i className="fa-solid fa-trash-can btnDelete" ></i>
                        </Popconfirm>

                        <i class="fa-regular fa-image btnImage" onClick={() => showModalImage(record)}></i>
                    </Space>
                </div>
            )
        }
    ].filter((item) => !item.hidden && !item.disabled)
}