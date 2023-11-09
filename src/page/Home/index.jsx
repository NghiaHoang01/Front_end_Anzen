import Header from "../../components/Header"
import moment from "moment"
import {
    Table,
    Modal,
    Button,
    notification,
    Spin
} from 'antd'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux"
import {
    createDeliveryOrderAsync,
    deleteDeliveryAsync,
    downloadAccountingAsync,
    downloadReceiptAsync,
    exportGridAsync,
    getAllDeliveryOrdersAsync,
    getDetailAccountingAsync,
    getDetailDeliverOrderAsync,
    getInforConsigneeByPhoneAsync,
    getInforShipperByPhoneAsync,
    getPhoneNumberAsync,
    getPhonNumberBySearchAsync,
    getSaleStaffAsync,
    selectDeliveryOrders
} from "./homeSlice"
import FooterComponent from "../../components/Footer"
import { useForm } from "antd/es/form/Form"
import dayjs from 'dayjs';
import { CloseOutlined } from '@ant-design/icons'
import { v4 } from "uuid"

import generateColumnsData from "./components/columnsData"
import generateColumnsEdit from "./components/columnEdit"
import generateColumnProvinces from "./components/columnProvinces"
import generateListSelect from "./components/listSelect"
import generateFormSeacrh from "./components/formSearch"
import generateFormModal from "./components/formModal"
import generateFormProduct from "./components/formProduct"
import generateModalImage from "./components/ModalImage"
import generateTable from "./components/columnPrice"
import generateModalBill from "./components/ModalBill"
// import generateModalCreate from "./components/ModalCreate"

import "./Style.css"
import { TabTitle } from "../../utils/ChangeTitle";

const Home = () => {

    TabTitle('Khu vực đơn hàng-ANZEN')

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const allDeliveryOrders = useSelector(selectDeliveryOrders)

    const [isHideColumn, setHideColumn] = useState(true)

    const [isGenCode, setIsGenCode] = useState(false)

    const [pagingSearch, setPagingSearch] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const [checkboxSearch, setCheckboxSearch] = useState(false)

    //kiem tra xem la tao don moi hay sua don
    const [checkCreate, setCheckCreate] = useState(false)

    // danh sach san pham trong modal
    const [dataInForm, setDataInForm] = useState([])

    // danh sach sdt filter
    const [listPhoneFilter, setListPhoneFilter] = useState([])

    // modal export excel
    const [isModalExportExcelOpen, setIsModalExportExcelOpen] = useState(false)

    // modal-edit
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    // modal-image
    const [isModalImageOpen, setIsModalImageOpen] = useState(false);

    // modal-bill
    const [isModalBillOpen, setIsModalBillOpen] = useState(false)

    // luu lai thong tin tim kiem
    const [valuesSearch, setValuesSearch] = useState({})

    // form
    const [formSearch] = useForm();
    const [formModal] = useForm();
    const [formProduct] = useForm();

    const dateFormat = 'DD/MM/YYYY';

    const showModalCreate = () => {
        setIsModalEditOpen(true);
        setCheckCreate(true)
    };

    const showModalEdit = async (record) => {
        // đây là api lấy data lên nếu cần
        // nhớ await phải đi vs async. bắt nếu res success thì mới open modal lên
        const res = await dispatch(getDetailDeliverOrderAsync(record.id));

        setCheckCreate(false);

        console.log(res)
        if (res) {
            setDataInForm(res.payload.result.deliveryOrderDetails)
            setIsModalEditOpen(true);
            formModal.setFieldsValue({
                ...record,
                // ...allDeliveryOrders?.deliveryItem,
                // cách đổ ngày tháng vào edit
                orderDate: moment(res.payload.result.orderDate)
            })
        }
    };

    // infor modal image
    const [nameInImageModal, setNameInImageModal] = useState('')
    const [saleStaffInImageModal, setSaleStaffInImageModal] = useState('')
    const [totalAmountInImageModal, setTotalAmountInImageModal] = useState('')
    const [paymentTypeInImageModal, setPaymentTypeInImageModal] = useState('')
    const showModalImage = (values) => {
        setIsModalImageOpen(true);

        // fill infformation
        setNameInImageModal(values.name)
        setSaleStaffInImageModal(values.saleStaff)
        setTotalAmountInImageModal(values.totalAmount)
        setPaymentTypeInImageModal(values.paymentType)
    };

    const handleCancelModalImage = () => {
        setIsModalImageOpen(false);
    }

    const handleOkFormEdit = async (values) => {
        if (dataInForm.length === 0) {
            openNotificationError();
        }
        else {
            setIsModalEditOpen(false)

            if (values.id) {
                values.deliveryOrderDetails = [...dataInForm]
                const res = await dispatch(createDeliveryOrderAsync(values))
                if (res) {
                    formModal.resetFields()
                    setDataInForm([])
                    openNotificationEditSuccess()
                    setCheckCreate(false)
                    await dispatch(getAllDeliveryOrdersAsync(valuesSearch))
                }
            }
            else {
                values.id = v4()
                values.deliveryOrderDetails = [...dataInForm]
                const res = await dispatch(createDeliveryOrderAsync(values))
                if (res) {
                    formModal.resetFields()
                    setDataInForm([])
                    openNotificationSuccess()

                    formSearch.resetFields()
                    setCheckboxSearch(false)

                    const params = {
                        pageIndex: 1,
                        pageSize: 10
                    }

                    setPagingSearch(params)

                    await dispatch(getAllDeliveryOrdersAsync(params))
                }


            }
        }
    };

    const handleDeleteProductInModal = (record) => {
        let newDataInform = dataInForm.filter(item => item.id !== record.id)
        setDataInForm([...newDataInform])
    }

    const handelEditProductInModal = (record) => {
        formProduct.setFieldsValue({
            ...record
        })
    }

    const handleFinishFormProduct = (values) => {
        let newDataInform = []
        if (values.id) {
            newDataInform = dataInForm.map((item) => {
                if (item.id === values.id) {
                    return values
                }
                else return item
            })
        }
        else {
            // them id cho san pham
            newDataInform = [...dataInForm]
            values.id = v4()
            newDataInform.push(values)
        }
        setDataInForm([...newDataInform])
        formProduct.resetFields()
    }

    const handleCancel = () => {
        setIsModalEditOpen(false);
        formModal.resetFields();
        setDataInForm([]);
    };

    const handleDeleteDeliveryOrder = async (id) => {
        const res = await dispatch(deleteDeliveryAsync(id))
        if (res) {
            await dispatch(getAllDeliveryOrdersAsync(valuesSearch))
        }
    }

    // modal-bill
    // infor modal bill
    const [idDelivery, setIdDelivery] = useState('')
    const [code, setCode] = useState('')
    const [saleStaff, setSaleStaff] = useState('')
    const [saleStaffPhone, setSaleStaffPhone] = useState('')
    const [shipper, setShipper] = useState('')
    const [shipperPhone, setShipperPhone] = useState('')
    const [fromAddress, setFromAddress] = useState('')
    const [consignee, setConsignee] = useState('')
    const [consigneePhone, setConsigneePhone] = useState('')
    const [toAddress, setToAddress] = useState('')
    const [deliveryOrderDetails, setDeliveryOrderDetails] = useState([])
    const [totalAmount, setTotalAmount] = useState()
    const [additionalAmount, setAdditionalAmount] = useState()
    const [paymentType, setPaymentType] = useState('')
    const [receiveType, setReceiveType] = useState('')
    const [sendType, setSendType] = useState('')
    const [ladingInfos, setLadingInfos] = useState({})
    const [otherFees, setOtherFees] = useState({})
    const [receivingFees, setReceivingFees] = useState({})
    const [transborderFees, setTransborderFees] = useState({})
    const [freightFees, setFreightFees] = useState({})

    const showModalBill = async (record) => {
        if (record.code) {
            const res = await dispatch(getDetailAccountingAsync(record.id))

            if (res) {
                setIdDelivery(res.payload.result.id)
                setCode(res.payload.result.code)
                setSaleStaff(res.payload.result.saleStaff)
                setSaleStaffPhone(res.payload.result.saleStaffPhone)
                setShipper(res.payload.result.shipper)
                setConsignee(res.payload.result.consignee)
                setFromAddress(res.payload.result.fromAddress)
                setToAddress(res.payload.result.toAddress)
                setShipperPhone(res.payload.result.shipperPhone)
                setConsigneePhone(res.payload.result.consigneePhone)
                setDeliveryOrderDetails(res.payload.result.deliveryOrderDetails)
                setTotalAmount(res.payload.result.totalAmount)
                setPaymentType(res.payload.result.paymentType)
                setReceiveType(res.payload.result.receiveType)
                setSendType(res.payload.result.sendType)
                setAdditionalAmount(res.payload.result.additionalAmount)
                setFreightFees(res.payload.result.freightFees)
                setTransborderFees(res.payload.result.transborderFees)
                setReceivingFees(res.payload.result.receivingFees)
                setOtherFees(res.payload.result.otherFees)
                setLadingInfos(res.payload.result.ladingInfos)
                setIsModalBillOpen(true)
            }
        }
    }


    const handleCancelModalBill = () => {
        setIsModalBillOpen(false)
    }

    const tabelPrice = generateTable(
        { totalAmount: totalAmount },
        { additionalAmount: additionalAmount }
    )

    const handleDownloadReceipt = async (id, code) => {
        setIsModalBillOpen(false)

        const res = await dispatch(downloadReceiptAsync(id))

        if (res) {
            const URL = window.URL.createObjectURL(new Blob([res.payload]));
            const link = document.createElement('a');
            link.href = URL
            link.setAttribute('download', `VanDon-${code}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
    }

    const handelDownloadAccounting = async (id, code) => {
        setIsModalBillOpen(false)

        const res = await dispatch(downloadAccountingAsync(id))

        if (res) {
            const URL = window.URL.createObjectURL(new Blob([res.payload]));
            const link = document.createElement('a')
            link.href = URL
            link.setAttribute('download', `KeToan-${code}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
    }

    const modalBill = generateModalBill(
        { isModalBillOpen: isModalBillOpen },
        { handleCancelModalBill: handleCancelModalBill },
        { handelDownloadAccounting: handelDownloadAccounting },
        { handleDownloadReceipt: handleDownloadReceipt },
        { id: idDelivery },
        { code: code },
        { saleStaff: saleStaff },
        { saleStaffPhone: saleStaffPhone },
        { shipper: shipper },
        { consignee: consignee },
        { fromAddress: fromAddress },
        { toAddress: toAddress },
        { shipperPhone: shipperPhone },
        { consigneePhone: consigneePhone },
        { deliveryOrderDetails: deliveryOrderDetails },
        { totalAmount: totalAmount },
        { paymentType: paymentType },
        { receiveType: receiveType },
        { sendType: sendType },
        { tabelPrice: tabelPrice },
        { freightFees: freightFees },
        { transborderFees: transborderFees },
        { receivingFees: receivingFees },
        { otherFees: otherFees },
        { ladingInfos: ladingInfos }
    )

    // checkbox
    const onChecked = (e) => {
        setCheckboxSearch(e.target.checked)
    }

    // radio show all
    const onChangeShowAll = (e) => {
        setHideColumn(e.target.value)
    };

    const onChangeCreateCode = (e) => {
        setIsGenCode(e.target.value)
    };

    // Search 
    const onSearchFinish = async (values) => {
        const dateForm = values.DateSearch[0].format("YYYY-MM-DD")
        const dateTo = values.DateSearch[1].format("YYYY-MM-DD")

        delete values.DateSearch

        const params = {
            ...values,
            pageIndex: 1,
            pageSize: 10,
            OrderDateFrom: dateForm,
            OrderDateTo: dateTo,
        }

        setValuesSearch(params)
        await dispatch(getAllDeliveryOrdersAsync(params))
    };

    // change fullName, userName to label,value
    const changeListSaleStaff = () => {
        return allDeliveryOrders.listSaleStaff.map((item) => {
            return {
                value: item.userName,
                label: item.fullName
            }
        })
    }

    // change code, name off list Provinces to label,value
    const changeListProvinces = () => {
        return generateColumnProvinces().map((item) => {
            return {
                value: item.code,
                label: item.name
            }
        })
    }

    const changeListPhoneNumber = (list) => {
        return list.map((item) => {
            return {
                value: item.phone,
                label: item.phone,
                id: item.id
            }
        })
    }

    const handleTableChange = (page) => {
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

        dispatch(getAllDeliveryOrdersAsync(values))

    }

    // Phone number
    const handleSelectShipperPhone = async (id) => {
        const res = await dispatch(getInforShipperByPhoneAsync(id))
        if (res) {
            formModal.setFieldsValue({
                shipper: res.payload.result.name,
                toAddress: res.payload.result.address
            })
        }
        setListPhoneFilter([])
    }

    const handleSelectConsigneePhone = async (id) => {
        const res = await dispatch(getInforConsigneeByPhoneAsync(id))
        if (res) {
            formModal.setFieldsValue({
                consignee: res.payload.result.name,
                fromAddress: res.payload.result.address
            })
        }
        setListPhoneFilter([])
    }

    const handleSearchPhone = async (value) => {
        if (value.length > 3) {
            const res = await dispatch(getPhonNumberBySearchAsync(value))
            if (res) {
                setListPhoneFilter(res.payload.result.items)
            }
        }
    }

    // useEffect
    useEffect(() => {
        dispatch(getAllDeliveryOrdersAsync(pagingSearch))

        // lay ra danh sach NVKD
        dispatch(getSaleStaffAsync())

        // lay ra danh sach so dien thoai
        dispatch(getPhoneNumberAsync())

    }, [])

    // notification
    const [api, contextHolder] = notification.useNotification();
    const openNotificationError = () => {
        api.info({
            message: `Thông báo`,
            description: 'Vui lòng thêm sản phẩm vận chuyển !',
            icon: <CloseOutlined style={{ color: '#be0505' }} />,
        });
    };

    const openNotificationSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Tạo mới đơn thành công',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    const openNotificationEditSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Sửa đơn thành công',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    const handleCancelModalExportExcel = () => {
        setIsModalExportExcelOpen(false)
    }

    // export excel
    const handelExportExcel = async () => {
        // const res = await dispatch(getAllDeliveryOrdersAsync(pagingSearch))
        // const s = "Đơn hàng_" + moment().format(dateFormat).toString()
        // if (res) {
        //     await ExportExcel(res.payload.result.items, "Danh sách đơn hàng", s)
        // }
        const res = dispatch(exportGridAsync(pagingSearch))
        if (res) {
            setIsModalExportExcelOpen(true)
        }
    }

    const handleOkExportExcel = () => {
        setIsModalExportExcelOpen(false)
        navigate("/export-reports")
    }

    // generate

    const lstSelect = generateListSelect()

    const columnsData = generateColumnsData(
        { pagingSearch: pagingSearch },
        { showModalBill: showModalBill },
        { showModalEdit: showModalEdit },
        { handleDeleteDeliveryOrder: handleDeleteDeliveryOrder },
        { showModalImage: showModalImage },
        { isShowAll: isHideColumn }
    )


    const columnsEdit = generateColumnsEdit(
        { handleDeleteProductInModal: handleDeleteProductInModal },
        { handelEditProductInModal: handelEditProductInModal }
    )

    // form search
    const searchForm = generateFormSeacrh(
        { formSearch: formSearch },
        { onSearchFinish: onSearchFinish },
        { dayjs: dayjs },
        { lstSelect: lstSelect },
        { checkboxSearch: checkboxSearch },
        { changeListSaleStaff: changeListSaleStaff },
        { dateFormat: dateFormat },
        { handelExportExcel: handelExportExcel },
        { showModalCreate: showModalCreate },
        { onChecked: onChecked },
        { isHideColumn: isHideColumn },
        { onChangeShowAll: onChangeShowAll }
    )

    // form modal
    const editForm = generateFormModal(
        { formModal: formModal },
        { handleOkFormEdit: handleOkFormEdit },
        { changeListSaleStaff: changeListSaleStaff },
        { dayjs: dayjs },
        { isGenCode: isGenCode },
        { onChangeCreateCode: onChangeCreateCode },
        { dateFormat: dateFormat },
        { changeListProvinces: changeListProvinces },
        { listPhoneFilter: listPhoneFilter },
        { changeListPhoneNumber: changeListPhoneNumber },
        { allDeliveryOrders: allDeliveryOrders },
        { handleSelectShipperPhone: handleSelectShipperPhone },
        { handleSearchPhone: handleSearchPhone },
        { handleSelectConsigneePhone: handleSelectConsigneePhone },
        { lstSelect: lstSelect }
    )

    // form product
    const productForm = generateFormProduct(
        { formProduct: formProduct },
        { handleFinishFormProduct: handleFinishFormProduct },
        { dataInForm: dataInForm },
        { columnsEdit: columnsEdit }
    )

    // modal image
    const modalImage = generateModalImage(
        { isModalImageOpen: isModalImageOpen },
        { handleCancelModalImage: handleCancelModalImage },
        { nameInImageModal: nameInImageModal },
        { saleStaffInImageModal: saleStaffInImageModal },
        { paymentTypeInImageModal: paymentTypeInImageModal },
        { totalAmountInImageModal: totalAmountInImageModal }
    )

    // modal create new product
    // const modalCreateNew = generateModalCreate(
    //     { checkCreate: checkCreate },
    //     { isModalEditOpen: isModalEditOpen },
    //     { handleCancel: handleCancel },
    //     { editForm: editForm },
    //     { productForm: productForm }
    // )

    return <div className="page">
        <Spin tip="Loading" size="large" spinning={allDeliveryOrders?.isLoading} className="spin">
            <Header userName={localStorage.getItem('userName')} />

            <div className="home element">

                {/* form search */}
                {
                    searchForm
                }

                <div>
                    <Table
                        rowKey="data"
                        className="data"
                        pageIndex={pagingSearch.pageIndex}
                        dataSource={allDeliveryOrders?.deliveryOrders?.items}
                        columns={columnsData}
                        size='middle'
                        scroll={{ x: "220%" }}
                        pagination={{
                            size: "small",
                            total: allDeliveryOrders?.deliveryOrders?.total,
                            current: pagingSearch.pageIndex,
                            pageSize: pagingSearch.pageSize,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                        }}
                        onChange={(page) => handleTableChange(page)} />
                </div>

                {/* modal-create-new-product */}

                <Modal title={checkCreate ? "Tạo đơn mới" : "Sửa đơn"}
                    open={isModalEditOpen}
                    onCancel={handleCancel}
                    width={680}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Đóng
                        </Button>,
                        <Button type="primary" htmlType="submit" form="formModal">
                            Gửi
                        </Button>,
                    ]}>

                    {/* form edit */}

                    {
                        editForm
                    }

                    {/* form product */}
                    {
                        productForm
                    }


                </Modal>

                {/* modal-image */}
                {
                    modalImage
                }

                {/* export excel */}
                <Modal
                    title="Thông báo"
                    open={isModalExportExcelOpen}
                    onOk={handleOkExportExcel}
                    onCancel={handleCancelModalExportExcel}
                    className="modal--export"

                >
                    <p className="text--modal">Bạn có muốn chuyển qua màn hình Export Report để tải file không ?</p>
                </Modal>

                {/* modal bill */}
                {
                    modalBill
                }
            </div>
            <FooterComponent />

        </Spin>

        {contextHolder}

    </div>
}

export default Home