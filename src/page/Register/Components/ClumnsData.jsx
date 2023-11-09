import { Space, Button, Switch } from "antd"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({ pagingSearch },
    { handelACtive },
    { handelChangeRole }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
            disabled: true
        },
        {
            title: 'isActive',
            dataIndex: 'isActive',
            key: 'isActive',
            hidden: true,
            disabled: true
        },
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            align: "center",
            render: (_, record, index) => <p>{((pagingSearch.pageIndex - 1) * pagingSearch.pageSize + index + 1)}</p>
        },
        {
            title: 'Tên đầy đủ',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Quyền',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, record) => (
                <Space>
                    <Switch key={record.id} defaultChecked={record.isActive} onChange={() => handelACtive(record)} />
                    <Button danger onClick={() => handelChangeRole(record)}>Sửa quyền</Button>
                </Space>
            )
        }
    ].filter(item => !item.hidden)
}