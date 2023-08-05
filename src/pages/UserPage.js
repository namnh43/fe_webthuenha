
import {Outlet} from "react-router";
import UserSidebar from "../components/sidebar/UserSidebar";
import Menubar from "../components/header/nav/Menubar";
import {Divider, Grid} from "@mui/material";
import {AdminSidebar} from "../components/sidebar/AdminSidebar";

export function UserPage() {
    return (
        <>
            {/*<div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"*/}
            {/*     data-sidebartype="full"*/}
            {/*     data-sidebar-position="fixed" data-header-position="fixed">*/}
            {/*    <aside className="left-sidebar">*/}
            {/*        <UserSidebar/>*/}
            {/*    </aside>*/}
            {/*    <div className="body-wrapper">*/}
            {/*        <header className="app-header">*/}
            {/*            <UserNavbar/>*/}
            {/*        </header>*/}
            {/*        <div className="container-fluid">*/}
            {/*            <Outlet></Outlet>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Menubar/>
            {/*<Divider />*/}
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <UserSidebar/>
                </Grid>
                <Divider
                    orientation="vertical"
                    flexItem
                />
                <Grid item xs>
                    <div className="body-wrapper">

                        <div className="container-fluid">
                            <Outlet></Outlet>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}