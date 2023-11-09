// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
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
        }
    ].filter(item => !item.hidden)
}