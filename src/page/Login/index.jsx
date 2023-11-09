import "./Style.css"
import logo from '../../assets/img/logo_chinh.png'
import { Form, Input, Button, Spin, notification } from "antd"
import { loginService } from "../../service/login";
import { useDispatch } from "react-redux";
import { getUserProfileAsync } from "./loginSlice";
import { useNavigate } from "react-router-dom";
import { useState, React } from "react";
import { CloseOutlined } from '@ant-design/icons'
import { TabTitle } from "../../utils/ChangeTitle";
// import { useTranslation } from "react-i18next"

const Login = () => {
    // translation
    // const { i18n, t } = useTranslation();
    // const translate = (lang) => {
    //     i18n.changeLanguage(lang);
    //     console.log(lang)
    // }

    TabTitle('Đăng nhập - ANZEN')

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Form
    const onFinish = async (values) => {
        setIsLoading(true)

        const response = await loginService(values)

        if (response.data) {
            console.log(response)
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)

            const res = await dispatch(getUserProfileAsync())
            if (res.payload.result) {
                localStorage.setItem("userName", res.payload.result.userName)
                navigate('/home')
            }
        } else {
            openNotification()
        }

        setIsLoading(false)
    };
    const onFinishFailed = (errorInfo) => {
    };


    // notification

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.info({
            message: `Thông báo`,
            description: 'Sai tên tài khoản hoặc mật khẩu, Vui lòng kiểm tra lại',
            icon: <CloseOutlined style={{ color: '#be0505' }} />,
        });
    };

    return <div className="login">
        <div className="login-element">
            <Spin tip="Loading" size="large" spinning={isLoading} className="spin">

                <div className="login-element__logo">
                    <img src={logo} alt="" />
                </div>
                <div className="login-element__title">
                    <p>Welcome to <span>anzen vận tải</span></p>
                </div>
                <div className="login-element__form">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}

                        >
                            <Input placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button className="btnLogin" type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="login-element__intro">
                    <p>Website giới thiệu của <a href="https://vantaianzen.vn/">ANZEN vận tải</a></p>
                </div>
            </Spin>

            {/* <p>{t("Username")}</p>
            <button onClick={() => translate("en")}>EN</button>
            <button onClick={() => translate("vi")}>VI</button> */}

            {/* error password or usename */}
            {contextHolder}
        </div>
    </div>
}

export default Login