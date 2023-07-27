import {AdminSidebar} from "../components/sidebar/AdminSidebar";
import {Divider, Grid} from "@mui/material";
import {Outlet} from "react-router";
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