import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import './Menubar.css'
import {Navbar} from "./Navbar";

function HomePageMenuBar() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsSticky(window.scrollY >= window.innerHeight);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={isSticky ? "border-bottom" : ""}
            style={{
                position: "sticky",
                top: "-16px",
                zIndex: "1000",
                boxShadow: isSticky ? "0 1px 2px rgba(0, 0, 0, 0.12)" : "none"
            }}
        >
            <Grid
                container
                spacing={3}
                sx={{
                    backgroundColor: isSticky ? "white" : "rgb(1,1,1,.3)",
                    color: isSticky ? "black" : "white",
                    height: '88px', display:"flex", justifyContent:"space-around",
                }}
                alignItems="center"
            >
                <Navbar/>
            </Grid>
        </div>

    );
}

export default HomePageMenuBar;