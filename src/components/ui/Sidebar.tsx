import { SettingsOutlined } from '@mui/icons-material';
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useUIContext } from 'context/ui';

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts'];

const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useUIContext();
  return (
    <Drawer anchor="left" open={sidemenuOpen} onClose={closeSideMenu}>
      <Box sx={{ p: '5px 10px' }}>
        <Typography variant="h4">Menú</Typography>
      </Box>
      <Box sx={{ width: 250 }}>
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
