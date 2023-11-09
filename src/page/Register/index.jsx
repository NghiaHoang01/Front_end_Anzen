import Header from "../../components/Header"
import { Button, Table, Spin, notification } from "antd"
import { useState } from "react"
import FooterComponent from "../../components/Footer"
import { useDispatch, useSelector } from "react-redux"
import { activeAsyns, changeRoleApplicationUsersAsyns, createNewApplicationUserAsyns, getAllApplicationUsersAsync, selectRegister } from "./registerSlice"
import { useEffect } from "react"
import { useForm } from "antd/es/form/Form"
import { CloseOutlined } from '@ant-design/icons'

import generateColumnsData from "./Components/ClumnsData"
import genreateModalCreate from "./Components/ModalCreate"
import generateModalChangeRole from "./Components/ModalChangeRole"

import "./Style.css"
import { TabTitle } from "../../utils/ChangeTitle"

const Register = () => {

    TabTitle('Tạo tài khoản - ANZEN')

    const dispatch = useDispatch()
    const allApplicationUsers = useSelector(selectRegister)

    const [formChangeRole] = useForm()
    const [formCreateNew] = useForm()

    const [pagingSearch, setPagingSearch] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const [isModalCreateNewOpen, setModalCreateNewOpen] = useState(false)
    const [isModalChangeRoleOpen, setIsModalChangeRoleOpen] = useState(false)

    const handleChangePage = (page) => {
        const params = {
            pageIndex: page.current,
            pageSize: 10
        }

        setPagingSearch(params)

        dispatch(getAllApplicationUsersAsync(params))
    }

    const handleRegister = () => {
        setModalCreateNewOpen(true)
    }

    const handelCreateNewFinish = async (values) => {

        setModalCreateNewOpen(false)

        values.email = 'Vantaianzen@gmail.com'

        const res = await dispatch(createNewApplicationUserAsyns(values))

        if (res) {
            openNotificationCreateAccountSuccess()

            const param = {
                pageIndex: 1,
                pageSize: 10
            }

            setPagingSearch(param)

            await dispatch(getAllApplicationUsersAsync(param))
        }

        formCreateNew.resetFields()

    }

    const handleModalCreateNewCancel = () => {
        setModalCreateNewOpen(false)
        formCreateNew.resetFields()
    }

    const handelChangeRole = (values) => {
        formChangeRole.setFieldsValue({
            ...values
        })
        setIsModalChangeRoleOpen(true)
    }

    const handelChangeRoleFinish = async (values) => {
        setIsModalChangeRoleOpen(false)

        const res = await dispatch(changeRoleApplicationUsersAsyns(values))

        if (res) {
            openNotificationChangeRoleSuccess()

            await dispatch(getAllApplicationUsersAsync(pagingSearch))
        }
    }

    const handleModalChangeRoleCancel = () => {
        setIsModalChangeRoleOpen(false)
    }

    const handelACtive = async (values) => {

        const params = {
            id: values.id,
            isActive: !values.isActive
        }

        const res = await dispatch(activeAsyns(params))

        if (res) {
            openNotificationActiveSuccess()

            await dispatch(getAllApplicationUsersAsync(pagingSearch))
        }
    }

    const listRole = [
        { value: 'Accounting', label: 'Accounting' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Sale', label: 'Sale' },
        { value: 'InventoryReceiving', label: 'InventoryReceiving' },
        { value: 'Admin', label: 'Admin' },
        { value: 'InventoryDelivery', label: 'InventoryDelivery' }
    ]

    useEffect(() => {
        dispatch(getAllApplicationUsersAsync(pagingSearch))
    }, [])

    // notification
    const [api, contextHolder] = notification.useNotification();
    const openNotificationChangeRoleSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Sửa quyền thành công !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    const openNotificationActiveSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Thành công !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    const openNotificationCreateAccountSuccess = () => {
        api.info({
            message: `Thông báo`,
            description: 'Thêm tài khoản thành công !',
            icon: <CloseOutlined style={{ color: '#04aa6d' }} />,
        });
    };

    // kiem tra ki tu viet hoa
    const containsUppercase = (str) => {
        return Boolean(str.match(/[A-Z]/));
    }

    // kiem tra ki tu viet thuong
    const containsLowercase = (str) => {
        return Boolean(str.match(/[a-z]/));
    }

    // kiem tra ki tu dac biet
    const containsSpecialCharacter = (str) => {
        return Boolean(str.match(/[-+_!@#$%^&*., ?]/));
    }

    // generate
    const dataColumns = generateColumnsData(
        { pagingSearch: pagingSearch },
        { handelACtive: handelACtive },
        { handelChangeRole: handelChangeRole }
    )

    const modalCreate = genreateModalCreate(
        { isModalCreateNewOpen: isModalCreateNewOpen },
        { handleModalCreateNewCancel: handleModalCreateNewCancel },
        { formCreateNew: formCreateNew },
        { handelCreateNewFinish: handelCreateNewFinish },
        { containsUppercase: containsUppercase },
        { containsLowercase: containsLowercase },
        { containsSpecialCharacter: containsSpecialCharacter },
        { listRole: listRole }
    )

    const modalChangeRole = generateModalChangeRole(
        { isModalChangeRoleOpen: isModalChangeRoleOpen },
        { handleModalChangeRoleCancel: handleModalChangeRoleCancel },
        { formChangeRole: formChangeRole },
        { handelChangeRoleFinish: handelChangeRoleFinish },
        { listRole: listRole }
    )

    return <div className="page">
        <Spin tip="Loading" size="large" spinning={allApplicationUsers?.isLoading} className="spin">
            <Header userName={localStorage.getItem("userName")} />

            <div className="register element">
                <div className="seacrh__action">
                    <div className="seacrh__action-btn">
                        <Button type="primary" onClick={handleRegister} >Tạo mới tài khoản</Button>
                    </div>
                </div>
                <div>
                    <Table
                        columns={dataColumns}
                        dataSource={allApplicationUsers?.applicationUsers.items}
                        pageIndex={pagingSearch.pageIndex}
                        size='middle'
                        pagination={{
                            size: "small",
                            total: allApplicationUsers?.applicationUsers.total,
                            current: pagingSearch.pageIndex,
                            pageSize: pagingSearch.pageSize,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                        }}
                        onChange={(page) => handleChangePage(page)}
                    >
                    </Table>
                </div>

                {
                    modalCreate
                }

                {
                    modalChangeRole
                }

            </div>

            <FooterComponent />
        </Spin>

        {contextHolder}
    </div >
}

export default Register