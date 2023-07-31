import {HouseDetail} from "../components/houses/HouseDetail";
import Menubar from "../components/header/nav/Menubar";
import Divider from '@mui/material/Divider';
export function HouseDetailPage() {
    return (
        <>
            <Menubar/>
            <Divider />
            <HouseDetail/>
        </>
    )
}