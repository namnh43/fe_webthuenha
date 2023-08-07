
import {Outlet} from "react-router";
import UserSidebar from "../components/sidebar/UserSidebar";
import Menubar from "../components/header/nav/Menubar";
import {Divider, Grid} from "@mui/material";
import {useEffect} from "react";

export function UserPage() {
    useEffect(() => {
        document.title = "User Page";
    },[])
    return (
        <>
            <Menubar/>
            <Grid container spacing={1}>
                <Grid item xs={2.5} className={'border-right'}>
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