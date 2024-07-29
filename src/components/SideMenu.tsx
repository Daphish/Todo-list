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
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from 'firebase/auth';

type Anchor = 'left';

export default function AnchorTemporaryDrawer() {

  const [ user ] = useAuthState(firebaseAuth);
  const router = useRouter();

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
      {!user && (
            <>
              <ListItem disablePadding>
                  <ListItemButton onClick={() => router.push('/signup')}>
                      <ListItemIcon>
                          <AccountIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign up" />
                  </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                  <ListItemButton onClick={() => router.push('/login')}>
                      <ListItemIcon>
                          <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Log in" />
                  </ListItemButton>
              </ListItem>
            </>
            )}
            {user && (
                <ListItem disablePadding>
                    <ListItemButton onClick={() => signOut(firebaseAuth)}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItemButton>
                </ListItem>
            )}
      </List>
    </Box>
  );

  return (
    <Box sx={{marginTop: 1, marginLeft: 1, width: 56}}>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Box>
            <Fab onClick={toggleDrawer(anchor, true)} color='secondary'>
              <MenuIcon />
            </Fab>
          </Box>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              '& .MuiPaper-root' : { backgroundColor: '#002803'}
            }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}