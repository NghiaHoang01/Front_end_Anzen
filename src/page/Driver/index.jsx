import FooterComponent from "../../components/Footer";
import Header from "../../components/Header";
import { Spin, Table, notification, Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import moment from "moment";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { createNewDriverAsyns, deleteDriverAsyns, getAllDriversAsyns, selectDriver } from "./driverSlice";
import { useEffect } from "react";

import generateColumnsData from './components/ColumnsData'
import generateFormSearch from './components/FormSearch'
import generateModalInforDriver from './components/ModalInforDriver'

import "./Style.css";
import { TabTitle } from "../../utils/ChangeTitle";

const Driver = () => {

    TabTitle('Tài xế - ANZEN')

    const dispatch = useDispatch();
    const allDrivers = useSelector(selectDriver);

    const [formSearch] = useForm();
    const [formInforDriver] = useForm()

    const [checkSearch, setCheckSearch] = useState(false);
    const [pagingSearch, setPagingSearch] = useState({
        pageIndex: 1,
        pageSize: 10,
    });
    const [valueSearch, setValueSearch] = useState();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [checkCreateNew, setCheckCreateNew] = useState(false);

    const onChecked = (e) => {
        setCheckSearch(e.target.checked);
    };

    const handleTableChange = (page) => {
        const params = {
            pageIndex: page.current,
            pageSize: 10,
        };

        setPagingSearch(params);

        const values = {
            ...valueSearch,
            params,
        };

        setValueSearch(values);

        dispatch(getAllDriversAsyns(values));
    };

    const onFinishFormSearch = async (values) => {
        const dateFrom = values.CreatedDate[0].format("YYYY-MM-DD");
        const dateTo = values.CreatedDate[1].format("YYYY-MM-DD");

        delete values.CreatedDate;

        const params = {
            ...values,
            CreatedDateFrom: dateFrom,
            CreatedDateTo: dateTo,
            pageIndex: 1,
            pageSize: 10,
        };

        setValueSearch(params);

        await dispatch(getAllDriversAsyns(params));
    };

    const handelCreateNewDriver = () => {
        setIsOpenModal(true);
        setCheckCreateNew(true)
    };

    const handelCancelModal = () => {
        setIsOpenModal(false);
        formInforDriver.resetFields()
    };

    const handleOkDriver = async (values) => {
        setIsOpenModal(false)
        if (values.id) {
            const res = await dispatch(createNewDriverAsyns(values))

            if (res) {

                openNotificationEditSuccess()

                await dispatch(getAllDriversAsyns(valueSearch))
            }
        }
        else {
            values.id = v4()

            const res = await dispatch(createNewDriverAsyns(values))

            if (res) {

                openNotificationSuccess()

                const params = {
                    pageIndex: 1,
                    pageSize: 10
                }

                setPagingSearch(params)

                formSearch.resetFields()
                setCheckSearch(false)

                await dispatch(getAllDriversAsyns(params))
            }
        }

        formInforDriver.resetFields()
        setCheckCreateNew(false)
    }

    const handleEditDriver = (values) => {
        setIsOpenModal(true)
        setCheckCreateNew(false)
        formInforDriver.setFieldsValue({
            ...values
        })
    }

    const handelDeleteDriver = async (values) => {
        const res = await (dispatch(deleteDriverAsyns(values.id)))

        if (res) {
            await dispatch(getAllDriversAsyns(valueSearch))
        }
    }

    const downloadImage = (values) => {
        setIsOpenModalImage(true)

        setName(values.name)
        setPhone(values.phone)
        setLicensePlate(values.licensePlate)
        setIdentity(values.identity)
        setDrivingLicense(values.drivingLicense)
        setCompany(values.company)
        setCompanyPhone(values.companyPhone)
    }

    // modal image
    const [isModalImageOpen, setIsOpenModalImage] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [licensePlate, setLicensePlate] = useState('')
    const [identity, setIdentity] = useState('')
    const [drivingLicense, setDrivingLicense] = useState('')
    const [company, setCompany] = useState('')
    const [companyPhone, setCompanyPhone] = useState('')

    const handleCancelModalImage = () => {
        setIsOpenModalImage(false)
    }

    useEffect(() => {
        dispatch(getAllDriversAsyns(pagingSearch));
    }, []);

    const [api, contextHolder] = notification.useNotification();

    const openNotificationSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Thêm tài xế thành công !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    const openNotificationEditSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Sửa thông tin tài xế thành công !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    // generate
    const columnsData = generateColumnsData(
        { pagingSearch: pagingSearch },
        { handleEditDriver: handleEditDriver },
        { handelDeleteDriver: handelDeleteDriver },
        { downloadImage: downloadImage }
    )

    const FormSearch = generateFormSearch(
        { formSearch: formSearch },
        { onFinishFormSearch: onFinishFormSearch },
        { dayjs: dayjs },
        { moment: moment },
        { checkSearch: checkSearch },
        { handelCreateNewDriver: handelCreateNewDriver },
        { onChecked: onChecked }
    )

    const ModalInforDriver = generateModalInforDriver(
        { checkCreateNew: checkCreateNew },
        { isOpenModal: isOpenModal },
        { handelCancelModal: handelCancelModal },
        { formInforDriver: formInforDriver },
        { handleOkDriver: handleOkDriver }
    )

    return (
        <div className="page">
            <Spin
                tip="Loading"
                size="large"
                spinning={allDrivers?.isLoading}
                className="spin"
            >
                <Header userName={localStorage.getItem("userName")} />

                <div className="driver element">
                    {
                        FormSearch
                    }

                    <div>
                        <Table
                            rowKey="data"
                            className="data"
                            pageIndex={pagingSearch.pageIndex}
                            dataSource={allDrivers?.drivers.items}
                            columns={columnsData}
                            size="middle"
                            scroll={{ x: "120%" }}
                            pagination={{
                                size: "small",
                                total: allDrivers?.drivers.total,
                                current: pagingSearch.pageIndex,
                                pageSize: pagingSearch.pageSize,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} of ${total} items`,
                            }}
                            onChange={(page) => handleTableChange(page)}
                        ></Table>
                    </div>

                    {
                        ModalInforDriver
                    }

                    <Modal
                        title="THÔNG TIN HÌNH ẢNH"
                        open={isModalImageOpen}
                        onCancel={handleCancelModalImage}

                        footer={[
                            <Button key="back" onClick={handleCancelModalImage}>
                                Đóng
                            </Button>,
                            <Button type="primary">
                                Tải ảnh xuống
                            </Button>,
                            <Button type="primary">
                                Gửi hình ảnh
                            </Button>,
                        ]}
                    >
                        <div className="modal--image">
                            <div className="modal--image__item">
                                <p>Tên tài xế: <span>{name}</span></p>
                                <p>SĐT: <span>{phone}</span></p>
                            </div>
                            <div className="modal--image__item">
                                <p>Biển số xe: <span>{licensePlate}</span></p>
                                <p>CMND/CCCD: <span>{identity}</span></p>
                            </div>
                            <div className="modal--image__item">
                                <p>GPLX: <span>{drivingLicense}</span></p>
                                <p>Tên công ty: <span>{company}</span></p>
                            </div>
                            <div className="modal--image__item">
                                <p>SĐT công ty: <span>{companyPhone}</span></p>
                            </div>
                            <div className="modal--image__item">
                                <label for="file">Tải hình ảnh</label>
                                <input type="file" name="file" id="file" />
                            </div>
                        </div>
                    </Modal>
                </div>

                <FooterComponent />
            </Spin>

            {contextHolder}

        </div>
    );
};

export default Driver;
