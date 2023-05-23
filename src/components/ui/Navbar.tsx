import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { useUIContext } from 'context/ui';
import NextLink from 'next/link';
import React, { FC } from 'react';

const Navbar: FC = () => {
  const { openSideMenu } = useUIContext();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlined />
        </IconButton>
        <NextLink href="/" passHref style={{ color: '#fff', textDecoration: 'none' }}>
          <Typography variant="h6">OpenJira</Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
