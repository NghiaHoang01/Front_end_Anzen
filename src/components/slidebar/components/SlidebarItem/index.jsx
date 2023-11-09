import "./Style.css"
import { NavLink } from 'react-router-dom'
const SlidebarItem = (props) => {

    return <NavLink to={props.link} className="slidebar-item" activeClassName="active" title={props.title}>
        <i class={props.nameIcon}></i>
        <p >{props.title}</p>
    </NavLink>
}

export default SlidebarItem