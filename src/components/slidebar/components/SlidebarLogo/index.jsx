import "./Style.css"
import logo from "../../../../assets/img/logo_chinh.png"

const SlidebarLogo = () => {

    return <>
        <a href="/" className="logo">
            <img src={logo} alt="" />
            <p >anzen</p>
        </a>
    </>
}

export default SlidebarLogo