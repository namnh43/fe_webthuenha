import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {List, ListItem, ListItemButton} from "@mui/material";
import ConstructionIcon from '@mui/icons-material/Construction';
import HouseIcon from '@mui/icons-material/House';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

function OwnerSideBar2() {
    const [selectedItem, setSelectedItem] = useState('user-list');
    const navigate = useNavigate();
    const drawer = (<div>
        <List>
            <ListItem className="">
                <span><p className="h4">Houses</p></span>
            </ListItem>
            <ListItemButton
                key='owner-list'
                selected={selectedItem == 'house-list'}
                onClick={() => {
                    setSelectedItem('house-list');
                    navigate('')
                }}
            >
                    <span className="me-3">
                      <HolidayVillageIcon/>
                    </span>
                <span className="hide-menu">House List</span>
            </ListItemButton>
            <ListItemButton
                key='owner-list'
                selected={selectedItem == 'add-house-form'}
                onClick={() => {
                    setSelectedItem('add-house-form');
                    navigate('add-house-form')
                }}
            >
                <span className="me-3">
                  <HouseIcon/>
                </span>
                <span className="hide-menu">Add a new house</span>
            </ListItemButton>
            <ListItemButton
                key='owner-list'
                selected={selectedItem == 'booking-list'}
                onClick={() => {
                    setSelectedItem('booking-list');
                    navigate('booking');
                }}
            >
                    <span className="me-3">
                      <ReceiptLongIcon/>
                    </span>
                <span className="hide-menu">Booking List</span>
            </ListItemButton>
            <ListItemButton
                key='owner-list'
                selected={selectedItem == 'maintenance-list'}
                onClick={() => {
                    setSelectedItem('maintenance-list');
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