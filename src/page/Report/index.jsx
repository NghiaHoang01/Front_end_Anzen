import FooterComponent from "../../components/Footer"
import Header from "../../components/Header"
import { TabTitle } from "../../utils/ChangeTitle"
import "./Style.css"

const Report = () => {

    TabTitle('Báo cáo - ANZEN')

    return <div className="page">
        <Header userName={localStorage.getItem('userName')} />

        <div className="report element">

        </div>

        <FooterComponent />
    </div>
}

export default Report