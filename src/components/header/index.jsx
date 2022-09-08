import React from "react"
import logo from "../../assets/logo.png"

const Header = () => {
    return (
        <header className="header">
            <nav className="nav-header d-flex px-2">
                <picture className="content-logo col-2">
                    <img src={logo} alt="" />
                </picture>
                <div className="nav-user col-10 gap-3 
                d-flex justify-content-end align-self-center">
                    <span>Hola Juan Carlos</span>
                    <a href="">Cerrar Sesión</a>
                </div>
            </nav>
        </header>
    )
}

export default Header;
