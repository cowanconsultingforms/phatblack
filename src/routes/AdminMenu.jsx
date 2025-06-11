import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'; // Assuming Material UI for styling
import DashboardIcon from '@mui/icons-material/Dashboard'; // Example icon

const AdminMenu = () => {
  return (
    <List>
      <ListItem button component="a" href="/admin/dashboard"> {/* Replace with your admin dashboard path */}
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      {/* Add other menu items here, using ListItem components and appropriate icons and links */}
    </List>
  );
};

export default AdminMenu;