import * as React from 'react';
import Grid from "@mui/material/Grid";
import './Menubar.css'
import {Navbar} from "./Navbar";

export default function Menubar() {
    return (
        <div className='mb-2 border-bottom'
             style={{
                 position: 'sticky', top: '-16px', zIndex: '2', backgroundColor: 'white',
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"}}
        >
            <Grid
                container
                spacing={3}
                  sx={{
                      color: "black",
                      height: '88px',
                      display:"flex", justifyContent:"space-around"
                  }}
                alignItems="center"
            >
                <Navbar isSticky={true}/>

            </Grid>
        </div>

    );
}
