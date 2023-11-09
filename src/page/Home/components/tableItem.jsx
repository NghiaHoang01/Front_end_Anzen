import { Table } from "antd"
const TableItem = (props) => {
    return <>
        <div className="modal--bill__title--child">
            <p>{props.title}</p>
        </div>
        <Table className="home__data table--bill"
            columns={[
                {
                    title: 'Tên công ty',
                    dataIndex: 'description',
                    key: 'description',
                }, {
                    title: 'Phí',
                    dataIndex: 'fee',
                    key: 'fee',
                },
            ]}
            size='middle'
            dataSource = {props.lstData}
        />
    </>
}

export default TableItem