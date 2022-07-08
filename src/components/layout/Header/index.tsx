import React, { FC, useState } from 'react';
import { AppBar, IconButton } from '@material-ui/core';
import { useWallet } from '@solana/wallet-adapter-react';
import MenuIcon from '@material-ui/icons/Menu';
import { ChevronLeft, Home } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import { useStyles } from './styles';
import { routes } from '../../../router/routes';
import AirdropButton from '../../AirdropButton';
import { useViewport } from '../../../hooks/useViewport';
import { DeviceType } from '../../../providers/ViewportProvider';
import Drawer from '../Drawer';
import WalletButton from '../WalletButton';
import NavButton from '../NavButton';
import { TESTING } from '../../../config/misc';
import { isAdmin } from '../../AdminRoute';

export interface HeaderProps {
  onBackNavigation?: () => void;
}

const NAV_LINKS_LIST = [
  { label: 'Chill Dogs Club', target: "/" },
  // { label: 'Auction', target: routes.AUCTIONS },
  { label: 'Admin', target: routes.ADMIN.HOME, admin: true },
];

const Header: FC<HeaderProps> = ({ onBackNavigation }) => {
  const { device } = useViewport();
  const classes = useStyles({ device });
  const { connected, publicKey } = useWallet();
  const { push, location } = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* // <div className={classes.root}>
    //   <div
    //     style={{
    //       width: '100%',
    //       height: device === DeviceType.Phone ? '50px' : '90px',
    //       background:
    //         'linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2))',
    //       backdropFilter: 'blur(3px)',
    //       zIndex: 98,
    //     }}
    //   />
    //   <AppBar className={classes.appBar} elevation={0}>
    //     {device === DeviceType.Phone ? (
    //       <div className={classes.drawerHeader}>
    //         {onBackNavigation ? (
    //           <IconButton size={'medium'} onClick={() => onBackNavigation()}>
    //             <ChevronLeft />
    //           </IconButton>
    //         ) : (
    //           <IconButton size={'medium'} onClick={() => push(routes.RAFFLES)}>
    //             <Home />
    //           </IconButton>
    //         )}
    //         <IconButton size={'medium'} onClick={() => setIsDrawerOpen(true)}>
    //           <MenuIcon />
    //         </IconButton>
    //         <Drawer
    //           wallet={publicKey}
    //           isOpen={isDrawerOpen}
    //           setIsOpen={setIsDrawerOpen}
    //           navLinksList={NAV_LINKS_LIST}
    //         />
    //       </div>
    //     ) : (
    //       <>
    //         <div>
    //           <IconButton
    //             onClick={() => push(routes.RAFFLES)}
    //             className={classes.homeButton}
    //           >
    //             <img
    //               src="/pnw_logo.png"
    //               alt={'Site banner'}
    //               className={classes.homeButtonIcon}
    //             />
    //           </IconButton>
    //         </div>
    //         <div className={classes.navContainer}>
    //           {NAV_LINKS_LIST.filter(
    //             ({ admin }) => !admin || (admin && isAdmin(publicKey))
    //           ).map(({ label, target }) => (
    //             <NavButton
    //               key={target}
    //               label={label}
    //               target={target}
    //               isCurrent={location.pathname === target}
    //               style={{ marginRight: '20px' }}
    //             />
    //           ))}
    //           {connected && TESTING && <AirdropButton />}
    //           <div className={classes.walletButtonContainer}>
    //             <WalletButton />
    //           </div>
    //         </div>
    //       </>
    //     )}
    //   </AppBar>
    // </div> */}


      <Grid container style={{background:'none'}}>
        <Grid item xs={12} md={12} lg={12}>
          <div className={classes.navContainer}>

            {connected && TESTING && <AirdropButton />}
            <div className={classes.walletButtonContainer}>
              <WalletButton  />
            </div>
          </div>
        </Grid>

      </Grid>

      {/* <Stack justifyContent="center">
        <div
          // onClick={() => push(routes.RAFFLES)}
          className={classes.homeButton}
        >
          <img
            src="/mellowman.png"
            alt={'Site banner'}
            className={classes.homeButtonIcon}
          />
        </div>
      </Stack> */}
      <Grid container spacing={1}
      //  style={{marginTop:'1.5%'}}
       >
        <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'center'}}>
          {NAV_LINKS_LIST.filter(
            ({ admin }) => !admin || (admin && isAdmin(publicKey))
          ).map(({ label, target }) => (
            <NavButton
              key={target}
              label={label}
              target={target}
              isCurrent={location.pathname === target}
              // disabled={label === "Auction" ? true : false}
            
              // style={label === "Auction" ?   { borderRadius:'0px 30px 30px 0px',backgroundColor:'white',padding:'8px 30px',color:'black',cursor: "no-drop", display:'flex',justifyContent:'center'}
              // : label==="Admin Panel" ? { borderRadius:'30px',padding:'8px 30px', display:'flex',justifyContent:'center'}:{ display:'flex',justifyContent:'center',background: 'linear-gradient(273.03deg, #86AEE0 4.06%, #D299DC 91.71%)',backgroundClip: 'text'}}
            />
          ))}
        </Grid>
      </Grid>

    </>

  );
};

export default Header;
