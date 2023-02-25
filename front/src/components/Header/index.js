import React, {useContext} from "react";
import {KeycloackContext} from "../../KeycloakContext";
import Search from "./Search";

function Header(props) {
    const {keycloackValue} = useContext(KeycloackContext)
    return (
        <React.Fragment>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Gcash</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Search/>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3"
                           onClick={() => {
                               keycloackValue.logout();
                           }}
                        >Sign out</a>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}
export default Header;
