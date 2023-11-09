import { Space, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from "@ant-design/icons";
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ pagingSearch },
    { handleEditDriver },
    { handelDeleteDriver },
    { downloadImage }) => {
    return [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            hidden: true,
            disabled: true,
        },
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            align: "center",
            width: 70,
            render: (_, record, index) => {
                return (
                    <p>
                        {(pagingSearch.pageIndex - 1) * pagingSearch.pageSize + index + 1}
                    </p>
                );
            },
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "CMND/CCCD",
            dataIndex: "identity",
            key: "identity",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Bằng lái xe",
            dataIndex: "drivingLicense",
            key: "drivingLicense",
        },
        {
            title: "Biển số xe",
            dataIndex: "licensePlate",
            key: "licensePlate",
        },
        {
            title: "Công ty",
            dataIndex: "company",
            key: "company",
        },
        {
            title: "SĐT công ty",
            dataIndex: "companyPhone",
            key: "companyPhone",
        },
        {
            title: "Chi tiết",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Hoạt động",
            key: "action",
            align: "center",
            render: (_, record) => (
                <div>
                    <Space>
                        <i class="fa-solid fa-pen-to-square btnEdit" onClick={() => handleEditDriver(record)}></i>

                        <Popconfirm
                            title="Bạn có đồng ý xóa?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: "red",
                                    }}
                                />
                            }
                            onConfirm={() => handelDeleteDriver(record)}
                        >
                            <i className="fa-solid fa-trash-can btnDelete"></i>
                        </Popconfirm>

                        <i class="fa-regular fa-image btnImage" onClick={() => downloadImage(record)}></i>
                    </Space>
                </div>
            ),
        },
    ].filter((item) => !item.hidden);
}