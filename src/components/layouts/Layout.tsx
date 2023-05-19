import { Box } from '@mui/material';
import { Navbar, Sidebar } from 'components/ui';
import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

const Layout: FC<PropsWithChildren<Props>> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Sidebar />

      <Box sx={{ p: '10px 20px' }}>{children}</Box>
    </Box>
  );
};

export default Layout;
