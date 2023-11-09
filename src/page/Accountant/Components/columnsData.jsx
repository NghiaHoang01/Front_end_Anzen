import { Tag, Space, Button } from "antd"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ pagingSearch },
    { handelMarkDone }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
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
            title: 'Số mã',
            dataIndex: 'code',
            key: 'code',
            width: 150,
            align: "center",
            render: (_, record) => (
                <Tag className="tag" color="#f42323" onClick={''}>
                    {record.code}
                </Tag>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
            align: "center",
            width: 120,
            render: (_, record) => {
                const arr = record.createdDate.split("T")
                const dateArr = arr[0].split("-")
                const date = dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0]
                return (
                    <span>{date}</span>
                )
            }
        },
        {
            title: 'SĐT Đối tác',
            dataIndex: 'partnerPhone',
            key: 'partnerPhone',
        },
        {
            title: 'Tài xế',
            dataIndex: 'driver',
            key: 'driver',
        },
        {
            title: 'SĐT Tài xế',
            dataIndex: 'driverPhone',
            key: 'driverPhone',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalFreight',
            key: 'totalFreight',
        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            align: "center",
            render: (_, record) => (
                <Space>
                    {
                        !record.isDone && <Button onClick={() => handelMarkDone(record)}>Hoàn thành</Button>
                    }
                </Space>
            )
        },
    ].filter(item => !item.hidden)
}