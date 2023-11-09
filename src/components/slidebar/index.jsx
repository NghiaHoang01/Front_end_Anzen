import SlidebarLogo from "./components/SlidebarLogo"
import "./Style.css"

import { HomeOutlined, HistoryOutlined, DollarCircleOutlined, ApartmentOutlined, RetweetOutlined, SnippetsOutlined, PieChartOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from "react-router";

const Slidebar = () => {

    const navigate = useNavigate()

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const onClick = (e) =>{
        navigate(e.key)
    }

    const items = [
        getItem('Khu vực đơn hàng', '/home', <HomeOutlined />),
        getItem('Bảng kê', '/policy', <DollarCircleOutlined />),
        getItem('Kế toán', '/accountant', <HistoryOutlined />),
        getItem('Khách hàng', '/customers', <RetweetOutlined />),
        getItem('Tài xế', '/drivers', <PieChartOutlined />),
        getItem('Báo cáo', '/reports', <SnippetsOutlined />),
        getItem('Lịch sử tải xuống', '/export-reports', <FileDoneOutlined />),
        getItem('Tạo tài khoản', '/register', <ApartmentOutlined />),

    ];

    return <div className="slidebar">
        <div className="slidebar__logo">
            <SlidebarLogo />
        </div>
        <Menu
            defaultSelectedKeys={['/home']}
            mode="vertical"
            style={
                {
                    backgroundColor: "transparent",
                }
            }
            items={items}
            onClick={onClick}
        />
    </div>
}

export default Slidebar