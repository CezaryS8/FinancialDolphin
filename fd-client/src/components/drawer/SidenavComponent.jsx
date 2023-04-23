import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LoginComponent from '../login/LoginComponent';
import DepositsComponent from '../deposits/DepositsComponent';
import { FaBeer } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LogoutComponent from '../logout/LogoutComponent'
import ErrorComponent from '../ErrorComponent'
import WelcomeComponent from '../welcome/WelcomeComponent'
import AuthProvider, { useAuth } from '../security/AuthContext'
import DepositComponent from '../deposits/DepositComponent'
import AppBarComponent from '../header/HeaderComponent';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SidenavComponent() {
  const authContext = useAuth()
  const isAuthenticated = authContext.isAuthenticated
  const username = authContext.username
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children
  
    return <Navigate to="/" />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

      {isAuthenticated &&
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={"/welcome/"+username+""}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to="/deposits"
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <FaBeer />
              </ListItemIcon>
              <ListItemText primary="Deposits" sx={{ opacity: open ? 1 : 0 }}/>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer> }
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    
        <Routes>
          <Route path='/' element={<LoginComponent />} />
          <Route path='/login' element={<LoginComponent />} />

          <Route path='/welcome/:username' element={
            <AuthenticatedRoute>
              <WelcomeComponent />
            </AuthenticatedRoute>
          } />

          <Route path='/deposits' element={
            <AuthenticatedRoute>
              <DepositsComponent />
            </AuthenticatedRoute>
          } />

          <Route path='/deposit/:id' element={
            <AuthenticatedRoute>
              <DepositComponent />
            </AuthenticatedRoute>
          } />

          <Route path='/logout' element={
            <AuthenticatedRoute>
              <LogoutComponent />
            </AuthenticatedRoute>
          } />

          <Route path='*' element={<ErrorComponent />} />

        </Routes>
      </Box>
    </Box>
  );
}