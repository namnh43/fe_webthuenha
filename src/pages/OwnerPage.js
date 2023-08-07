import React, {useEffect} from 'react';
import {Outlet} from "react-router";
import OwnerSideBar2 from "../components/roles/owner/OwnerSideBar2";
import Menubar from "../components/header/nav/Menubar";
import {Divider, Grid} from "@mui/material";

function OwnerPage() {
    useEffect(() => {
        document.title = "Owner Page";
    },[])
    return (
        <>
            <Menubar/>
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