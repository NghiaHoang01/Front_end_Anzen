import "./Style.css"

import { MenuOutlined} from '@ant-design/icons';

const Header = (props) => {

    return <div className="header">
        <div className="header__menu">
            <MenuOutlined />
        </div>

        <div className="header__infor">
            <i class="fa-regular fa-user"></i>
            <p>{props.userName}</p>

            <div className="header__logout">
                <button>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Log out
                </button>
            </div>
        </div>
    </div>
}

export default Header