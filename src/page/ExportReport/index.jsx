import { Table, Space, Popconfirm, Button, Spin } from "antd"
import { useState } from "react"
import FooterComponent from "../../components/Footer"
import Header from "../../components/Header"
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./Style.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteExportReportsAsyns, getAllExportReportsAsyns, selectExportReport } from "./ExportReportSlice";
import { useEffect } from "react";
import { TabTitle } from "../../utils/ChangeTitle";

const ExportReport = () => {

    TabTitle('Lịch sử tải xuống - ANZEN')

    const dispatch = useDispatch()
    const allExportReports = useSelector(selectExportReport)

    const [pagingSearch, setPagingSearch] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const columnsData = [
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
            align: 'center',
            width: 70,
            render: (_, record, index) => <p>{(pagingSearch.pageIndex - 1) * pagingSearch.pageSize + index + 1}</p>
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Màn hình',
            dataIndex: 'type',
            key: 'type',
            render: (_, record) => {
                if (record.type === 'Driver') {
                    return <p>Tài xế</p>
                } else if (record.type === 'Customer') {
                    return <p>Khách hàng</p>
                } else {
                    return <p>Khu vực đơn hàng</p>
                }

            }
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                if (record.status === 'Downloaded') {
                    return <p>Đã tải</p>
                } else {
                    return <p>Sẵn sàng</p>
                }

            }
        },
        {
            title: 'Hoạt động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            width: 120,
            render: (_, record) => (
                <div>
                    <Space>
                        <Popconfirm
                            title="Bạn có đồng ý xóa?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            onConfirm={() => handelDeleteExportReport(record)}
                        >
                            <i className="fa-solid fa-trash-can btnDelete" ></i>
                        </Popconfirm>

                        <Button>Tải xuống</Button>
                    </Space>
                </div>
            )
        }
    ].filter(item => !item.hidden)

    const handleChangePage = (page) => {
        const params = {
            pageIndex: page.current,
            pageSize: 10
        }

        setPagingSearch(params)

        dispatch(getAllExportReportsAsyns(params))
    }

    const handelDeleteExportReport = async (values) => {
        const res = await (dispatch(deleteExportReportsAsyns(values.id)))

        if (res) {
            await dispatch(getAllExportReportsAsyns(pagingSearch))
        }
    }

    useEffect(() => {
        dispatch(getAllExportReportsAsyns(pagingSearch))
    }, [])

    return <div className="page">
        <Spin tip="Loading" size="large" spinning={allExportReports?.isLoading} className="spin">

            <Header userName={localStorage.getItem('userName')} />

            <div className="export-report element">
                <Table
                    rowKey="data"
                    className="data"
                    dataSource={allExportReports?.exportReports.items}
                    columns={columnsData}
                    size='middle'
                    pageIndex={pagingSearch.pageIndex}
                    pagination={{
                        size: "small",
                        total: allExportReports?.exportReports.total,
                        current: pagingSearch.pageIndex,
                        pageSize: pagingSearch.pageSize,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                    }}
                    onChange={(page) => handleChangePage(page)}
                    style={{
                        marginTop: '10px'
                    }}
                >

                </Table>
            </div>

            <FooterComponent />
        </Spin>
    </div>
}

export default ExportReport