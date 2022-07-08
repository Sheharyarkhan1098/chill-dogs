// import React, { FC } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';

// import { useStyles } from './styles';

// const WalletButton: FC = () => {
//   const classes = useStyles();
//   const { connected } = useWallet();

//   return (
//     <WalletMultiButton
//       variant="outlined"
//       color="secondary"
//       className={
//         connected ? classes.walletDisconnectButton : classes.walletConnectButton
//       }
//     />
//   );
// };


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../../../assets/chill_logo.png';
import Logout from '../../../assets/logout.svg';
import {Link} from 'react-router-dom';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';

const  WalletButton = () => {
  const wallet = useWallet();
  const { connected } = useWallet();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pages = ['raffles', 'auctions', 'about us'];
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    // <AppBar position="static" style={{background:'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} alt="Logo" style={{width:'241px', height:'77px'}}/>
          </Typography> */}

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: "flex" } }} style={{justifyContent:'space-between', alignItems: "center",gap:'49px'}}>
            {/* <Typography component="div" style={{display: "flex", alignItems: "center"}}>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={Logo} alt="Logo" style={{width:'80px', margin: "10px 0px"}}/>
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="raffle.chilldogsclub.com"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontFamily: 'Rubik Wet Paint',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Chill Dogs Club
          </Typography>
          </Typography> */}
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#A7A7A7', display: 'block' }}
                style={{textTransform:'capitalize', fontSize:'18px', fontFamily:'Poppins',fontWeight:400}}
              >
              <Link to={page==="about us" ? '/about': "/"+page} style={{textDecoration:'none', color:'#A7A7A7'}}>  {page}</Link>
              </Button>
            ))} */}
            {/* <Button
                key={"My_Ticket"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                style={{textTransform:'uppercase',border: '2px solid #D39ADD', borderRadius: '30px', width:'144px',height:'55px',fontWeight:700, fontSize:'16px', color:'#D39ADD'}}
              >
                My Tickets 
              </Button> */}
              <Button sx={{display: {xs: "flex"}, margin: {xs: "auto", sm: 0} }}>
                        <WalletMultiButton  
                        // variant="outlined"
                        // color="secondary"
                        // className={connected ? "walletDisconnectButton" : "walletConnectButton"}
                        style={{border: '1px solid white', borderRadius: '5px', color:'white',background:'transparent', fontSize: 20, padding: "10px 20px"}}
                        />
                </Button>
              {/* <Button
                key={"logout"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: 'block' }}
                style={{textTransform:'capitalize', }}
              >
                <img src={Logout} alt="logout-logo" style={{width:'32px', height:'32px'}}/>
              </Button> */}
          </Box>
        </Toolbar>
      </Container>
    // </AppBar>
  );
};
export default WalletButton;
