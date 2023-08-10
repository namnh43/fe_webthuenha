import {AdminSidebar} from "../components/sidebar/AdminSidebar";
import {Divider, Grid} from "@mui/material";
import {Outlet} from "react-router";
import Menubar from "../components/header/nav/Menubar";
import {useEffect} from "react";

export function AdminPage2() {
    useEffect(() => {
        document.title = "Admin Page";
    },[])
    return (
        <>
            <Menubar/>
            <Grid container spacing={1}>
                <Grid item xs={2.5} className={'border-right'}>
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