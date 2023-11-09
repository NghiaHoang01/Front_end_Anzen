// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return [{
        name: 'status',
        title: 'Trạng thái đơn hàng',
        holder: 'Chọn trạng thái đơn hàng',
        lstOption: [{ value: 'New', label: 'Đơn mới' },
        { value: 'Gone', label: 'Đơn hàng đã đi' },
        { value: 'Inventory', label: 'Đơn hàng tồn kho' },
        { value: 'Incurred', label: 'Đơn hàng phát sinh' }]
    }, {
        name: 'paymentType',
        title: 'Hình thức thanh toán',
        holder: 'Chọn hình thức thanh toán',
        lstOption: [{ value: 'TTS', label: 'TTS' },
        { value: 'TDN', label: 'TĐN' },
        { value: 'DTT', label: 'ĐTT' },
        { value: 'Other', label: 'Khác' }]
    }, {
        name: 'isDone',
        title: 'Đơn hàng hoàn tất',
        holder: 'Chọn đơn hàng đã hoàn tất hay chưa',
        lstOption: [{ value: 'true', label: 'Đơn hàng đã hoàn tất' },
        { value: 'false', label: 'Đơn hàng chưa hoàn tất' }]
    },]
}