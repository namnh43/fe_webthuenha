import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {List, ListItem, ListItemButton} from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import GiteOutlinedIcon from "@mui/icons-material/GiteOutlined";
import HearingOutlinedIcon from "@mui/icons-material/HearingOutlined";

function OwnerSideBar2() {
    const [selectedItem, setSelectedItem] = useState('user-list');
    const navigate = useNavigate();
    const drawer = (<div>
        <List>
            <ListItem className="">
                <span><p className="h4">Houses</p></span>
            </ListItem>
            <ListItemButton
                key='user-list'
                selected={selectedItem == 'user-list'}
                onClick={() => {
                    setSelectedItem('user-list');
                    navigate('')
                }}
            >
                    <span className="me-3">
                      <GroupOutlinedIcon/>
                    </span>
                <span className="hide-menu">House List</span>
            </ListItemButton>
            <ListItemButton
                key='user-list'
                selected={selectedItem == 'host-list'}
                onClick={() => {
                    setSelectedItem('host-list');
                    navigate('add-house-form')
                }}
            >
                <span className="me-3">
                  <GiteOutlinedIcon/>
                </span>
                <span className="hide-menu">Add a new house</span>
            </ListItemButton>
            <ListItemButton
                key='user-list'
                selected={selectedItem == 'waiting-list'}
                onClick={() => {
                    setSelectedItem('waiting-list');
                    navigate('booking');
                }}
            >
                    <span className="me-3">
                      <HearingOutlinedIcon/>
                    </span>
                <span className="hide-menu">Booking List</span>
            </ListItemButton>
        </List>
    </div>);

    return (<>

        {drawer}
        </>
    );
}

export default OwnerSideBar2;