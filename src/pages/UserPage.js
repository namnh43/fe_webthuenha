
import {Outlet} from "react-router";
import {UserSidebar} from "../components/user/UserSidebar";
import {UserNavbar} from "../components/user/UserNavbar";
import {UserFooter} from "../components/user/UserFooter";

export function UserPage() {
    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
                 data-sidebartype="full"
                 data-sidebar-position="fixed" data-header-position="fixed">
                <aside className="left-sidebar">
                    <UserSidebar/>
                </aside>
                <div className="body-wrapper">
                    <header className="app-header">
                        <UserNavbar/>
                    </header>
                    <div className="container-fluid">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}