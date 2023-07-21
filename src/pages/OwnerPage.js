import React from 'react';
import OwnerSidebar from "../components/OwnerSidebar";
import OwnerNavbar from "../components/OwnerNavbar";
import {Outlet} from "react-router";

function OwnerPage() {
    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
                 data-sidebartype="full"
                 data-sidebar-position="fixed" data-header-position="fixed">
                <aside className="left-sidebar">
                    <OwnerSidebar/>
                </aside>
                <div className="body-wrapper">
                    <header className="app-header">
                        <OwnerNavbar/>
                    </header>
                    <div className="container-fluid">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OwnerPage;