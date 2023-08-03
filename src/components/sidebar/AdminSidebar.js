import {List, ListItem, ListItemButton} from "@mui/material";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import {  useLocation } from 'react-router-dom';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import VillaIcon from '@mui/icons-material/Villa';

export function AdminSidebar() {
    // const drawerWidth = 240;
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedItem, setSelectedItem] = useState(location.pathname);
    useEffect( () => setSelectedItem(location.pathname));
    const drawer = (<div>
        <List>
            <ListItem
                key='dashboard' className="">
                <span className="h4">Dashboard</span>
            </ListItem>
            <ListItemButton
                key='users'
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
                key='hosts'
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
                key='waiting-hosts'
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