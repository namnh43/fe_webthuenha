import * as React from 'react';
import Grid from "@mui/material/Grid";
import './Menubar.css'
import {Navbar} from "./Navbar";

export default function Menubar() {
    return (
        <div className='mb-2 border-bottom' style={{position: 'sticky', top: '-16px', zIndex: '1000', backgroundColor: 'white'}}>
            <Grid
                container
                spacing={2}
                  sx={{
                      color: "black",
                      height: '80px',
                      display:"flex", justifyContent:"space-around"
                  }}
                alignItems="center"
            >
                <Navbar/>

            </Grid>
        </div>

    );
}
