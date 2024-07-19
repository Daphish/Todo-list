'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountIcon from '@mui/icons-material/AccountBox';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/login';
import LogoutIcon from '@mui/icons-material/logout';
import Link from 'next/link';

type Anchor = 'left';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  
  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Sign up', 'Log in', 'Log out'].map((text, index) => (
          <Link href={index === 0 ? '/signup' : index === 1 ? '/login' : '/logout'} legacyBehavior key={text}>
            <a style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 ? <AccountIcon /> : index === 1 ? <LoginIcon /> : <LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </a>
          </Link>
      ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Box sx={{marginTop: 1, marginLeft: 1}}>
            <Fab onClick={toggleDrawer(anchor, true)} color='primary'>
              <MenuIcon />
            </Fab>
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              '& .MuiPaper-root' : { backgroundColor: '#00838f'}
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}