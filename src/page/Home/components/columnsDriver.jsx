// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return [
        {
            title: 'Mã bảng kê',
            dataIndex: 'code',
            key: 'code',
            align: "center"
        },
        {
            title: 'Tên lái xe',
            dataIndex: 'driver',
            key: 'driver',
            align: "center",
        },
        {
            title: 'Bằng lái xe',
            dataIndex: 'driverIdentity',
            key: 'driverIdentity',
            align: "center"
        },
        {
            title: 'SĐT tài xế',
            dataIndex: 'driverPhone',
            key: 'driverPhone',
            align: "center"
        },
        {
            title: 'Biển số xe',
            dataIndex: 'licensePlate',
            key: 'licensePlate',
            align: "center"
        },
        {
            title: 'Đối tác',
            dataIndex: 'partner',
            key: 'partner',
            align: "center"
        },
        {
            title: 'SĐT Đối tác',
            dataIndex: 'partnerPhone',
            key: 'partnerPhone',
            align: "center"
        }
    ]
}