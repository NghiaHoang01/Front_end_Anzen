import FooterComponent from "../../components/Footer"
import Header from "../../components/Header"
import { TabTitle } from "../../utils/ChangeTitle"
import { Menu, Form, Button, Input, Table, Checkbox, DatePicker, Tag, Space, Spin, AutoComplete } from 'antd'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons'
import { useState } from "react"
import dayjs from "dayjs"
import moment from "moment"
import { useForm } from "antd/es/form/Form"

import "./Style.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllPolicyAsync, getLicenseplatesAsync, selectPolicy } from "./policySlice"
import { useEffect } from "react"

const Policy = () => {

    TabTitle('Bảng kê - ANZEN')

    const dispatch = useDispatch()
    const allPolicys = useSelector(selectPolicy)

    const [formSearch] = useForm();
    const [formInfor] = useForm();

    const [current, setCurrent] = useState('listPolicy')
    const [checkboxSearch, setCheckboxSearch] = useState(false)
    const [pagingSearch, setPagingSearch] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const [pagingLicenseplates,] = useState({
        pageIndex: 1,
        pageSize: 50
    })

    const [listLicenseplates, setListLicenseplates] = useState([])

    const [checkCreate, setCheckCreate] = useState(false)
    const [valuesSearch, setValuesSearch] = useState()

    const onClickMenuItem = (e) => {
        setCurrent(e.key)
        if (e.key === 'newPolicy') {
            setCheckCreate(true)
        } else {
            setCheckCreate(false)
        }

        getLicenseplates()
    };

    const getLicenseplates = async () => {
        const res = await dispatch(getLicenseplatesAsync(pagingLicenseplates))
        if (res) {
            const lst = allPolicys?.listLicenseplates.map(item => {
                return {
                    value: item.licensePlate,
                    label: item.licensePlate
                }
            })
            setListLicenseplates(lst)
        }
    }

    const { RangePicker } = DatePicker
    const dateFormat = 'DD/MM/YYYY'

    const onSearchFinish = async (values) => {
        const dateForm = values.DateSearch[0].format('YYYY-MM-DD')
        const dateTo = values.DateSearch[1].format('YYYY-MM-DD')

        delete values.DateSearch
        const valuesSearch = {
            ...values,
            LadingDateFrom: dateForm,
            LadingDateTo: dateTo,
            pageIndex: 1,
            pageSize: 10
        }

        setValuesSearch(valuesSearch)

        await dispatch(getAllPolicyAsync(valuesSearch))

    }

    const onChecked = () => {
        setCheckboxSearch(!checkboxSearch)
    }

    const showModalCreate = () => {
        setCheckCreate(true)
        setCurrent('newPolicy')

        getLicenseplates()
    }

    const handelExportExcel = () => {

    }

    const handleTableChange = (page) => {

        const params = {
            pageIndex: page.current,
            pageSize: 10
        }

        setPagingSearch(params)

        const values = {
            ...valuesSearch,
            ...params
        }

        setValuesSearch(values)

        dispatch(getAllPolicyAsync(values))
    }

    const handelEdit = (values) => {
        setCurrent('newPolicy')
        setCheckCreate(true)

        getLicenseplates()

        // formInfor.setFieldsValue({
        //     ...values,
        //     createdDate: values.createdDate.toLocaleDateString()
        // })
        console.log(values.createdDate)
    }

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
            align: "center",
            width: 110,
            render: (_, record) => <Tag className="tag" color="#f42323">
                {record.code}
            </Tag>
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
            title: 'Tên công ty',
            dataIndex: 'partner',
            key: 'partner',
            hidden: true
        },
        {
            title: 'SĐT đối tác',
            dataIndex: 'partnerPhone',
            key: 'partnerPhone',
        },
        {
            title: 'Tài xế',
            dataIndex: 'driver',
            key: 'driver',
        },
        {
            title: 'SĐT tài xế',
            dataIndex: 'driverPhone',
            key: 'driverPhone',
        },
        {
            title: 'Biển số xe',
            dataIndex: 'licensePlate',
            key: 'licensePlate',
            hidden: true
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'driverAddress',
            key: 'driverAddress',
            hidden: true
        },
        {
            title: 'CMND',
            dataIndex: 'driverIdentity',
            key: 'driverIdentity',
            hidden: true
        },
        {
            title: 'giấy phép lái xe',
            dataIndex: 'drivingLicense',
            key: 'drivingLicense',
            hidden: true
        },
        {
            title: 'Danh sách hàng',
            dataIndex: 'deliveryOrderBillOfLadings',
            key: 'deliveryOrderBillOfLadings',
            hidden: true
        },
        {
            title: 'Tiền tạm ứng',
            dataIndex: 'advanceAmount',
            key: 'advanceAmount',
            hidden: true
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalFreight',
            key: 'totalFreight',
        },
        {
            title: 'Thao tác',
            dataIndex: 'thaoTac',
            align: "center",
            width: 140,
            render: (_, record) => (
                <div>
                    <Space>
                        <Button onClick={() => handelEdit(record)}>Sửa</Button>

                        <i class="fa-regular fa-image btnImage" onClick={''}></i>
                    </Space>
                </div>
            )
        }
    ].filter(item => !item.hidden)

    const columnsProduct = [
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
            align: "center",
            width: 70,
            // render: (_, record, index) => {
            //     return <p>{((pagingSearch.pageIndex - 1) * pagingSearch.pageSize) + index + 1}</p>
            // },
        },
        {
            title: 'MVĐ',
            dataIndex: 'code',
            key: 'code',
            align: "center",
            render: (_, record) => <Tag className="tag" color="#f42323">
                {record.code}
            </Tag>
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'partner',
            key: 'partner',
            align: "center",
        },
        {
            title: 'Tên hàng',
            dataIndex: 'partner',
            key: 'partner',
        },
        {
            title: 'Số lượng',
            dataIndex: 'partnerPhone',
            key: 'partnerPhone',
        },
        {
            title: 'Nơi giao',
            dataIndex: 'driver',
            key: 'driver',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'driverPhone',
            key: 'driverPhone',
        },
        {
            title: 'Hình thức thu tiền',
            dataIndex: 'totalFreight',
            key: 'totalFreight',
        },
        {
            title: 'Số tiền lái xe thu',
            dataIndex: 'totalFreight',
            key: 'totalFreight',
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalFreight',
            key: 'totalFreight',
        },
        {
            title: 'Thao tác',
            dataIndex: 'thaoTac',
            align: "center",
            width: 140,
            render: (_, record) => (
                <div>
                    <Space>
                        <Button onClick={''}>Xóa</Button>
                    </Space>
                </div>
            )
        }
    ].filter(item => !item.hidden)

    const items = [
        {
            label: 'Danh sách bản kê đã tạo',
            key: 'listPolicy',
            icon: <AppleOutlined />,
        },
        {
            label: 'Tạo mới bảng kê',
            key: 'newPolicy',
            icon: <AndroidOutlined />,
        },
    ];

    useEffect(() => {
        dispatch(getAllPolicyAsync(pagingSearch))
    }, [])

    return <div className="page">
        <Spin tip="Loading" size="large" spinning={allPolicys?.isLoading} className="spin">
            <Header userName={localStorage.getItem('userName')} />

            <div className="policy element">
                <div className="navbar">
                    <Menu onClick={onClickMenuItem} selectedKeys={[current]} mode="horizontal" items={items} />
                </div>

                <div style={{ display: checkCreate ? 'none' : 'block' }}>

                    <Form
                        name="basic"
                        form={formSearch}
                        onFinish={onSearchFinish}
                        initialValues={
                            {
                                DateSearch: [dayjs('2022/01/01'), dayjs(moment())]
                            }
                        }
                    >
                        <div className="seacrh__input">
                            <div className="seacrh__input__item">
                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Mã bảng kê</p>
                                    <Form.Item
                                        name="Code"
                                    >
                                        <Input className="input input--max" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Biển số xe</p>
                                    <Form.Item
                                        name="DrivingLicense"
                                    >
                                        <Input className="input input--max" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">SĐT tài xế</p>
                                    <Form.Item
                                        name="DriverPhone"
                                    >
                                        <Input className="input input--max" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Từ ngày - Đến ngày</p>
                                    <Form.Item
                                        name="DateSearch"
                                        style={{
                                            width: "300px"
                                        }}
                                    >
                                        <RangePicker format={dateFormat} />
                                    </Form.Item>
                                </div>

                            </div>

                            <div className="seacrh__input__item wrap " style={{ display: checkboxSearch ? "flex" : "none" }}>
                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Tài xế</p>
                                    <Form.Item
                                        name="Driver"
                                    >
                                        <Input className="input input--max" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Tên đối tác</p>
                                    <Form.Item
                                        name="Partner"
                                    >
                                        <Input className="input input--max" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Số điện thoại đối tác</p>
                                    <Form.Item
                                        name="PartnerPhone"
                                    >
                                        <Input className="input input--max" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Tổng số tiền từ</p>
                                    <Form.Item
                                        name="TotalFreightFrom"
                                    >
                                        <Input className="input input--max" type="number" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Tổng số tiền đến</p>
                                    <Form.Item
                                        name="TotalFreighTo"
                                    >
                                        <Input className="input input--max" type="number" ></Input>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="seacrh__action">
                            <div className="seacrh__action-btn">

                                <Button type="primary" htmlType="reset">Clear</Button>

                                <Button type="primary" htmlType="submit">Tìm kiếm</Button>

                                <Button type="primary" onClick={() => handelExportExcel()}>Export Excel</Button>

                                <Button type="primary" onClick={showModalCreate} >Tạo mới bảng kê</Button>

                                <Checkbox className="chkSearch" onChange={onChecked}>Tìm kiếm nâng cao</Checkbox>
                            </div>
                        </div>
                    </Form>

                    <div >
                        <Table
                            rowKey="data"
                            className="data"
                            pageIndex={pagingSearch.pageIndex}
                            dataSource={allPolicys?.policys.items}
                            columns={columnsData}
                            size='middle'
                            pagination={{
                                size: "small",
                                total: allPolicys?.policys.total,
                                current: pagingSearch.pageIndex,
                                pageSize: pagingSearch.pageSize,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                            }}
                            onChange={(page) => handleTableChange(page)} />
                    </div>
                </div>

                <div style={{ display: checkCreate ? 'block' : 'none' }}>
                    <div className="title-create-new-policy">
                        <p>BẢNG KÊ GIAO NHẬN VẬN CHUYỂN</p>
                    </div>

                    <Form
                        name="basic"
                        form={formInfor}
                        id='formInfor'
                        onFinish={''}
                    // initialValues={
                    //     {
                    //         createdDate: dayjs(moment())
                    //     }
                    // }
                    >
                        <div className="create__input">
                            <div className="create__input__item">
                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Mã bảng kê</p>
                                    <Form.Item
                                        name="code"
                                    >
                                        <Input className="input input--create" type="text" disabled style={{ color: "#ffbd2f", fontSize: "14.5px" }}></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="form__input__item--title">Ngày tháng</p>
                                    <Form.Item
                                        name="createdDate"
                                    >
                                        <DatePicker className="date-max" format={dateFormat} />
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Hợp đồng số</p>
                                    <Form.Item
                                        name="referenceContract"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Tên công ty</p>
                                    <Form.Item
                                        name="partner"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Số điện thoại</p>
                                    <Form.Item
                                        name="partnerPhone"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Mã số thuế</p>
                                    <Form.Item
                                        name="MST"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="create__input__item no--flex">
                                <div className="form__input__item">
                                    <p className="form__input__item--special">Người lái xe</p>
                                    <Form.Item
                                        name="driver"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="form__input__item--special">Biển số xe</p>
                                    <Form.Item
                                        name="licensePlate"
                                    >
                                        <AutoComplete
                                            className={'select__item select--max'}
                                            options={listLicenseplates}
                                            style={{
                                                width: 400
                                            }}
                                            onSelect={(value, option) => ''}
                                            onSearch={(value) => ''}
                                        />
                                    </Form.Item>
                                </div>
                            </div>

                            <div className="create__input__item">
                                <div className="form__input__item">
                                    <p className="form__input__item--special">Địa chỉ</p>
                                    <Form.Item
                                        name="driverAddress"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="form__input__item--special">CMND</p>
                                    <Form.Item
                                        name="driverIdentity"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Đã tạm ứng</p>
                                    <Form.Item
                                        name="advanceAmount"
                                    >
                                        <Input className="input input--create" type="number" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="form__input__item--special">Giấy phép lái xe</p>
                                    <Form.Item
                                        name="drivingLicense"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="form__input__item--special">Điện thoại lái xe</p>
                                    <Form.Item
                                        name="driverPhone"
                                    >
                                        <Input className="input input--create" type="text" ></Input>
                                    </Form.Item>
                                </div>

                                <div className="form__input__item">
                                    <p className="seacrh__input__item-title">Tổng cước cho xe</p>
                                    <Form.Item
                                        name="totalFreight"
                                    >
                                        <Input className="input input--create" type="number" ></Input>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="create__action">
                            <div className="create__action-btn">
                                <Button type="primary" onClick={''}>Danh sách hàng cần đi</Button>

                                <Button type="primary" onClick={''}>Xóa dữ liệu để tạo mới</Button>

                                <Button type="primary" form="formInfor">Gửi</Button>
                            </div>
                        </div>
                    </Form>

                    <div >
                        <Table
                            rowKey="data"
                            className="data"
                            pageIndex={pagingSearch.pageIndex}
                            dataSource={''}
                            columns={columnsProduct}
                            size='middle'
                            pagination={{
                                size: "small",
                                total: allPolicys?.policys.total,
                                current: pagingSearch.pageIndex,
                                pageSize: pagingSearch.pageSize,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                            }}
                            onChange={(page) => handleTableChange(page)} />
                    </div>
                </div>
            </div>

            <FooterComponent />
        </Spin>
    </div>
}

export default Policy