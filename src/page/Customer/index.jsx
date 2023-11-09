import Header from "../../components/Header"
import { Spin, notification, Table } from "antd"
import { CloseOutlined } from '@ant-design/icons'
import { useForm } from "antd/es/form/Form"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewCustomerAsync, deleteCustomerAsync, getCustomersAsync, selectCustomers } from "./customerSlice";
import { useEffect } from "react";
import { v4 } from "uuid";

import generateColumnsData from "./Components/ColumnsData"
import generateFormSearch from "./Components/FormSearch"
import generateModalCustomer from "./Components/ModalCustomer"
import FooterComponent from "../../components/Footer"

import "./Style.css"
import { TabTitle } from "../../utils/ChangeTitle";

const Customer = () => {

    TabTitle('Khách hàng - ANZEN')

    const allCustomers = useSelector(selectCustomers)

    const dispatch = useDispatch()

    const [isModalCreateCustomerOpen, setIsModalCreateCustomerOpen] = useState(false)

    const [checkCreate, setCheckCreate] = useState(false)

    const [pagingSearch, setPagingSearch] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const [valuesSearch, setValuesSearch] = useState()

    const [formSearch] = useForm();
    const [formInforCustomer] = useForm();

    const handleEditCustomer = (values) => {
        setCheckCreate(true)
        setIsModalCreateCustomerOpen(true)
        formInforCustomer.setFieldsValue({
            ...values
        })
    }

    const handleChangePage = (page) => {
        const params = {
            pageIndex: page.current,
            pageSize: 10
        }

        setPagingSearch(params)

        const values = {
            ...valuesSearch,
            pageIndex: params.pageIndex,
            pageSize: params.pageSize
        }

        setValuesSearch(values)

        dispatch(getCustomersAsync(values))
    }

    const onFinshFormSearch = async (values) => {
        const dateForm = (values.createdDate[0].format('YYYY-MM-DD'))
        const dateTo = (values.createdDate[1].format('YYYY-MM-DD'))

        delete values.createdDate

        const params = {
            ...values,
            pageIndex: 1,
            pageSize: 10,
            CreatedDateFrom: dateForm,
            CreatedDateTo: dateTo

        }

        setValuesSearch(params)

        await dispatch(getCustomersAsync(params))
    }

    const handleCreateCustomerCancel = () => {
        setIsModalCreateCustomerOpen(false)
    }

    const handleCreateNewCustomer = () => {
        setCheckCreate(false)
        setIsModalCreateCustomerOpen(true)
    }

    const handleOkCustomer = async (values) => {
        setIsModalCreateCustomerOpen(false)

        if (values.id) {
            const res = await dispatch(createNewCustomerAsync(values))

            if (res) {
                openNotificationEditSuccess()
                await dispatch(getCustomersAsync(valuesSearch))
            }
        }
        else {
            values.id = v4()

            const params = {
                pageIndex: 1,
                pageSize: 10
            }

            const res = await dispatch(createNewCustomerAsync(values))

            if (res) {
                openNotificationSuccess()

                setPagingSearch(params)

                await dispatch(getCustomersAsync(params))

                formSearch.resetFields()
            }
        }

        formInforCustomer.resetFields()
        setCheckCreate(false)
    }

    const handelDeleteCustomer = async (value) => {
        const res = await dispatch(deleteCustomerAsync(value.id))

        if (res) {
            await dispatch(getCustomersAsync(valuesSearch))
        }
    }

    useEffect(() => {
        dispatch(getCustomersAsync(pagingSearch))
    }, [])

    // notification
    const [api, contextHolder] = notification.useNotification();

    const openNotificationSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Thêm khách hàng thành công !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    const openNotificationEditSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Sửa thông tin thành công !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    // generate
    const columnsData = generateColumnsData(
        { pagingSearch: pagingSearch },
        { handleEditCustomer: handleEditCustomer },
        { handelDeleteCustomer: handelDeleteCustomer }
    )

    const FormSearch = generateFormSearch(
        { formSearch: formSearch },
        { onFinshFormSearch: onFinshFormSearch },
        { handleCreateNewCustomer: handleCreateNewCustomer }
    )

    const ModalCustomer = generateModalCustomer(
        { checkCreate: checkCreate },
        { isModalCreateCustomerOpen: isModalCreateCustomerOpen },
        { handleCreateCustomerCancel: handleCreateCustomerCancel },
        { formInforCustomer: formInforCustomer },
        { handleOkCustomer: handleOkCustomer }
    )

    return <div className="page">
        <Spin tip="Loading" size="large" spinning={allCustomers?.isLoading} className="spin">
            <Header userName={localStorage.getItem('userName')} />

            <div className="customer element">
                {
                    FormSearch
                }
                <div>
                    <Table
                        rowKey="data"
                        className="data"
                        dataSource={allCustomers?.listCutomers?.items}
                        columns={columnsData}
                        pageIndex={pagingSearch.pageIndex}
                        size='middle'
                        pagination={{
                            size: "small",
                            total: allCustomers?.listCutomers?.total,
                            current: pagingSearch.pageIndex,
                            pageSize: pagingSearch.pageSize,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                        }}
                        onChange={(page) => handleChangePage(page)}
                    />
                </div>

                {
                    ModalCustomer
                }

            </div>

            <FooterComponent />

        </Spin>

        {contextHolder}

    </div >
}

export default Customer