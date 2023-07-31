import {AdminNavbar} from "../components/roles/admin/AdminNavbar";
import {AdminSidebar} from "../components/roles/admin/AdminSidebar";
import {AdminFooter} from "../components/roles/admin/AdminFooter";
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
                        <Outlet></Outlet>
                        <AdminFooter/>
                    </div>
                </div>
            </div>
        </>
    )
}