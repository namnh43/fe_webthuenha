import {AdminNavbar} from "../components/AdminNavbar";
import {AdminSidebar} from "../components/AdminSidebar";
import {AdminFooter} from "../components/AdminFooter";
import {Outlet} from "react-router";

export function AdminPage() {
    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"
                 data-sidebartype="full"
                 data-sidebar-position="fixed" data-header-position="fixed">
                <aside className="left-sidebar">
                    <AdminSidebar/>
                </aside>
                <div className="body-wrapper">
                    <header className="app-header">
                        <AdminNavbar/>
                    </header>
                    <div className="container-fluid">
                        {/*<h1>Admin main content</h1>*/}
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </>
    )
}