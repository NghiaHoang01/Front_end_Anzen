import { Space, Popconfirm } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ pagingSearch },
    { handleEditCustomer },
    { handelDeleteCustomer }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
            disabled: true
        }, {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: "center",
            width: 70,
            render: (_, record, index) => {
                return <p>{((pagingSearch.pageIndex - 1) * pagingSearch.pageSize) + index + 1}</p>
            },
        }, {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Chi tiết khách hàng',
            dataIndex: 'description',
            key: 'description',
        }, {
            title: 'Hoạt động',
            dataIndex: 'hoatDong',
            align: "center",
            width: 120,
            render: (_, record) => (
                <div>
                    <Space>
                        <i class="fa-solid fa-pen-to-square btnEdit" onClick={() => handleEditCustomer(record)}></i>

                        <Popconfirm
                            title="Bạn có đồng ý xóa?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            onConfirm={() => handelDeleteCustomer(record)}
                        >
                            <i className="fa-solid fa-trash-can btnDelete" ></i>
                        </Popconfirm>
                    </Space>
                </div>
            )
        }
    ].filter((item) => !item.hidden)
}