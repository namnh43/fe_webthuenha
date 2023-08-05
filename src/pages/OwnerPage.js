import React from 'react';
import OwnerNavbar from "../components/roles/owner/OwnerNavbar";
import {Outlet} from "react-router";
import OwnerSideBar2 from "../components/roles/owner/OwnerSideBar2";
import Menubar from "../components/header/nav/Menubar";
import {Divider, Grid} from "@mui/material";
import {AdminSidebar} from "../components/sidebar/AdminSidebar";

function OwnerPage() {
    return (
        <>
            {/*<div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6"*/}
            {/*     data-sidebartype="full"*/}
            {/*     data-sidebar-position="fixed" data-header-position="fixed">*/}
            {/*    <aside className="left-sidebar">*/}
            {/*        <OwnerSideBar2/>*/}
            {/*    </aside>*/}
            {/*    <div className="body-wrapper">*/}
            {/*        <header className="app-header">*/}
            {/*            <OwnerNavbar/>*/}
            {/*        </header>*/}
            {/*        <div className="container-fluid">*/}
            {/*            <Outlet/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Menubar/>
            {/*<Divider />*/}
            <Grid container spacing={1}>
                <Grid item xs={2.5}>
                    <OwnerSideBar2/>
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
    );
}

export default OwnerPage;