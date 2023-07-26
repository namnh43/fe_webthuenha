import {HouseDetail} from "../components/HouseDetail";
import Menubar from "../components/header/nav/Menubar";
import Grid from '@mui/material/Grid';
export function HouseDetailPage() {
    return (
        <>
            <div className="mb-2 align-content-end" style={{backgroundColor:"lightblue"}}>

            </div>
            <Grid container spacing={2}
                  sx={{
                      backgroundColor:"lightblue"
                  }}
            >
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={2}>
                    <Menubar/>
                </Grid>
            </Grid>
                <HouseDetail/>
        </>
    )
}