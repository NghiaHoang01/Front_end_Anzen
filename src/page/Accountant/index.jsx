import Header from "../../components/Header"
import { Spin, Table, notification } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState, useEffect } from "react"
import FooterComponent from "../../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { getAllBillOfLandingsAsyns, markDoneAsync, selectAccountant } from "./accountantSlice"
import { CloseOutlined } from '@ant-design/icons'
import generateColumnsData from "./Components/columnsData"
import generateFormSearch from "./Components/FormSearch"

import "./Style.css"
import { TabTitle } from "../../utils/ChangeTitle"
const Accountant = () => {

    TabTitle('Kế toán - ANZEN')

    const dispatch = useDispatch()
    const allBillOfLandings = useSelector(selectAccountant)

    const [formSearch] = useForm();

    const [checkedSearch, setCheckedSearch] = useState(false)

    const onCheckedSearch = (e) => {
        console.log(e)
        setCheckedSearch(e.target.checked)
    }

    const [pagingSearch, setPagingSearch] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const [valuesSearch, setValuesSearch] = useState({})

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

        dispatch(getAllBillOfLandingsAsyns(values))

    }

    const handelSearch = async (values) => {
        const dateFrom = values.CreatedDate[0].format('YYYY-MM-DD')
        const dateTo = values.CreatedDate[1].format('YYYY-MM-DD')

        delete values.CreatedDate

        const params = {
            ...values,
            pageIndex: 1,
            pageSize: 10,
            LadingDateFrom: dateFrom,
            LadingDateTo: dateTo
        }

        setValuesSearch(params)

        await dispatch(getAllBillOfLandingsAsyns(params))
    }

    const handelMarkDone = async (record) => {
        const res = await dispatch(markDoneAsync(record.id))

        if (res) {
            openNotificationSuccess()
        }

        dispatch(getAllBillOfLandingsAsyns(valuesSearch))
    }

    const [api, contextHolder] = notification.useNotification();

    const openNotificationSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Bảng kê đã hoàn thành !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    // generate
    const columnsData = generateColumnsData(
        { pagingSearch: pagingSearch },
        { handelMarkDone: handelMarkDone }
    )

    const FormSearch = generateFormSearch(
        { formSearch: formSearch },
        { handelSearch: handelSearch },
        { checkedSearch: checkedSearch },
        { onCheckedSearch: onCheckedSearch }
    )

    useEffect(() => {
        dispatch(getAllBillOfLandingsAsyns(pagingSearch))
    }, [])

    return <div className="page">
        <Spin tip="Loading" size="large" spinning={allBillOfLandings?.isLoading} className="spin">
            <Header userName={localStorage.getItem("userName")} />

            <div className="accountant element">

                {
                    FormSearch
                }

                <div>
                    <Table
                        rowKey="data"
                        className="data"
                        pageIndex={pagingSearch.pageIndex}
                        dataSource={allBillOfLandings?.lstBillOfLandings.items}
                        columns={columnsData}
                        size='middle'
                        pagination={{
                            size: "small",
                            total: allBillOfLandings?.lstBillOfLandings.total,
                            current: pagingSearch.pageIndex,
                            pageSize: pagingSearch.pageSize,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                        }}
                        onChange={(page) => handleChangePage(page)} />
                </div>
            </div>

            <FooterComponent />
        </Spin>

        {contextHolder}

    </div>
}

export default Accountant