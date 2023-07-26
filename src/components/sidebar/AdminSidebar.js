import {Divider, ListItemIcon, List, ListItem, ListItemButton, Drawer, Toolbar} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useNavigate} from "react-router";
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HearingOutlinedIcon from '@mui/icons-material/HearingOutlined';

export function AdminSidebar() {
    // const drawerWidth = 240;
    const [selectedItem, setSelectedItem] = useState('user-list');
    const navigate = useNavigate();
    const drawer = (<div>
        <Toolbar>
            <div className="col-8 col-md-8 col-lg-4">
                <h1 className="mb-0"><a href="/" className="h2 mb-0"><strong>Homeland<span
                    className="text-danger">.</span></strong></a></h1>
            </div>
        </Toolbar>
        <Divider/>
        <List>
            <ListItem className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span><p className="h4">USERS</p></span>

            </ListItem>
            <ListItemButton
                key='user-list'
                selected={selectedItem == 'user-list'}
                onClick={() => {
                    setSelectedItem('user-list');
                    navigate('users')
                }}
            >
                    <span className="me-3">
                      <GroupOutlinedIcon/>
                    </span>
                <span className="hide-menu">User List</span>
            </ListItemButton>
            <ListItemButton
                key='user-list'
                selected={selectedItem == 'host-list'}
                onClick={() => {
                    setSelectedItem('host-list');
                    navigate('hosts')
                }}
            >
                <span className="me-3">
                  <GiteOutlinedIcon/>
                </span>
                <span className="hide-menu">Host List</span>
            </ListItemButton>
            <ListItemButton
                key='user-list'
                selected={selectedItem == 'waiting-list'}
                onClick={() => {
                    setSelectedItem('waiting-list');
                    navigate('waiting-hosts');
                }}
            >
                    <span className="me-3">
                      <HearingOutlinedIcon/>
                    </span>
                <span className="hide-menu">Waiting Lounge</span>
            </ListItemButton>
        </List>
    </div>);

    return (<>
        {drawer}
    </>)
}