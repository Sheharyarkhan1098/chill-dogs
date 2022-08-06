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
       
          <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: "flex" } }} style={{justifyContent:'space-between', alignItems: "center",gap:'49px'}}>
          
              <Button sx={{display: {xs: "flex"}, margin: {xs: "auto", sm: 0} }}>
                        <WalletMultiButton  
                        
                        style={{border: '3px solid #000', borderRadius: '5px', color:'#fff',background:'black', fontSize: 20, padding: "10px 20px", textShadow: '4px 2px 4px rgba(0, 0, 0, 0.8)', cursor: 'pointer'}}
                        />
                </Button>
  
          </Box>
        </Toolbar>
      </Container>
    // </AppBar>
  );
};
export default WalletButton;
