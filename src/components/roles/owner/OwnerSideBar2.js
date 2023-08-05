import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router";
import {List, ListItem, ListItemButton} from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction';
import HouseIcon from '@mui/icons-material/House';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

function OwnerSideBar2() {
    const [selectedItem, setSelectedItem] = useState('user-list');
    const navigate = useNavigate();
    const currentUrl = useLocation().pathname

    useEffect(() => {
        setSelectedItem(currentUrl)
    });


    const drawer = (<div>
        <List>
            <ListItem key={'Houses'} className="">
                <span><p className="h4">Houses</p></span>
            </ListItem>
            <ListItemButton
                key='owner'
                selected={selectedItem === '/owner'}
                onClick={() => {
                    setSelectedItem('/owner');
                    navigate('')
                }}
            >
                    <span className="me-3">
                      <HolidayVillageIcon/>
                    </span>
                <span className="hide-menu">House List</span>
            </ListItemButton>
            <ListItemButton
                key='booking'
                selected={selectedItem === '/owner/booking'}
                onClick={() => {
                    setSelectedItem('/owner/booking');
                    navigate('booking');
                }}
            >
                    <span className="me-3">
                      <ReceiptLongIcon/>
                    </span>
                <span className="hide-menu">Booking List</span>
            </ListItemButton>
            <ListItemButton
                key='maintenance'
                selected={selectedItem === '/owner/maintenance'}
                onClick={() => {
                    setSelectedItem('/owner/maintenance');
                    navigate('maintenance');
                }}
            >
                    <span className="me-3">
                      <ConstructionIcon/>
                    </span>
                <span className="hide-menu">Maintenance management</span>
            </ListItemButton>
        </List>
    </div>);

    return (<>

        {drawer}
        </>
    );
}

export default OwnerSideBar2;