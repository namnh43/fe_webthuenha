import {AdminSidebar} from "../components/sidebar/AdminSidebar";
import {Divider, Grid, Toolbar} from "@mui/material";
import {AdminNavbar} from "../components/AdminNavbar";
import {Outlet} from "react-router";
import {AdminFooter} from "../components/AdminFooter";
import Menubar from "../components/header/nav/Menubar";

export function AdminPage2() {
    return (
        <>
            <Menubar/>
            <Divider />
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <AdminSidebar/>
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