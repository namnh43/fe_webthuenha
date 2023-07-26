import {HouseDetail} from "../components/HouseDetail";
import Menubar from "../components/header/nav/Menubar";
import Grid from '@mui/material/Grid';

export function HouseDetailPage() {
    return (
        <>
            <Grid container spacing={2}
                  sx={{
                      backgroundColor: "lightgrey"
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