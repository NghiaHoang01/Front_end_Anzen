import { Button, Space, Popconfirm } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ handleDeleteProductInModal }, { handelEditProductInModal }) => {
    return [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
        },
        {
            title: 'Tên hàng',
            dataIndex: 'name',
            key: 'name',
            align: "center",
        },
        {
            title: 'ĐVT',
            dataIndex: 'unit',
            key: 'unit',
            align: "center"
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: "center"
        },
        {
            title: 'Khối lượng',
            dataIndex: 'weight',
            key: 'weight',
            align: "center"
        },
        {
            title: 'Trọng lượng',
            dataIndex: 'mass',
            key: 'mass',
            align: "center"
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            align: "center"
        }, {
            title: 'Thao tác',
            key: 'thaoTac',
            align: "center",
            render: (_, record, index) => <Space>
                <Button onClick={() => handelEditProductInModal(record)}>Sửa</Button>

                <Popconfirm
                    title="Bạn có đồng ý xóa không ?"
                    icon={
                        <QuestionCircleOutlined
                            style={{
                                color: 'red',
                            }}
                        />
                    }
                    onConfirm={() => { handleDeleteProductInModal(record) }}
                >
                    <Button danger>Xóa</Button>
                </Popconfirm>
            </Space>
        },

    ].filter(item => !item.hidden)
}