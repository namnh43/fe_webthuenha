import {List, ListItem, ListItemButton} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import VillaIcon from '@mui/icons-material/Villa';

export function AdminSidebar() {
    // const drawerWidth = 240;
    const [selectedItem, setSelectedItem] = useState('user-list');
    const navigate = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname;

    useEffect(() => {
        setSelectedItem(currentUrl);
    })

    const drawer = (<div>
        <List>
            <ListItem className="">
                <span><p className="h4">USERS</p></span>
            </ListItem>
            <ListItemButton
                key='/admin/users'
                selected={selectedItem === '/admin/users'}
                onClick={() => {
                    setSelectedItem('/admin/users');
                    navigate('users')
                }}
            >
                    <span className="me-3">
                      <GroupOutlinedIcon/>
                    </span>
                <span className="hide-menu">User List</span>
            </ListItemButton>
            <ListItemButton
                key='/admin/hosts'
                selected={selectedItem === '/admin/hosts'}
                onClick={() => {
                    setSelectedItem('/admin/hosts');
                    navigate('hosts')
                }}
            >
                <span className="me-3">
                  <VillaIcon/>
                </span>
                <span className="hide-menu">Host List</span>
            </ListItemButton>
            <ListItemButton
                key='/admin/waiting-hosts'
                selected={selectedItem === '/admin/waiting-hosts'}
                onClick={() => {
                    setSelectedItem('/admin/waiting-hosts');
                    navigate('waiting-hosts');
                }}
            >
                    <span className="me-3">
                      <AccessAlarmIcon/>
                    </span>
                <span className="hide-menu">Waiting Lounge</span>
            </ListItemButton>
        </List>
    </div>);

    return (<>
        {drawer}
    </>)
}