import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { height } from '@mui/system';
import { DeviceType } from '../../providers/ViewportProvider';

export const useStyles = makeStyles<Theme, { device: DeviceType }>(
  (theme: Theme) => ({
    root: ({ device }) => ({
      height: 'max-content',
      width: '322px',
      position: 'relative',
      borderRadius: '20px',
      padding:'26px 28px',
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '0 3px 10px 0 #111',
        transform: 'scale3d(1.02, 1.02, 1)',
      },
      '&:active': {
        transform: 'scale3d(1, 1, 1)',
      },
    }),
    media: {
      height: '100%',
      minHeight: '250px',
      // padding: '20px',
      borderRadius: '35px'
    },
    raffleInfo: {
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      fontSize: '18px',
      // padding: '15px',
      textAlign:'left',
    },
    cardLabel: {
      fontSize: '15px',
    },
    detailsRow1: {
      // color: 'white',
      color: '#81d4f2',
      fontWeight: 'bold',
      fontFamily:'Inter',
      //textTransform: 'uppercase',
      marginBottom: '10px',
      AlignItems:'left'
    },
    detailsRow2: {
      color: theme.palette.common.black,
      display: 'flex',
      flexDirection: 'row',
      // justifyContent: 'space-around',
      gap:'10px',
      width: '100%',
      marginTop: '10px',
      marginBottom: '10px',
      marginLeft:'-40px'
    },
    detailsRow3: {
      color: theme.palette.common.black,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      fontSize: '20px',
      marginTop: '10px',
      //justifyContent: 'center',
    },
    label: {
      fontSize: '16px',
      color: '#81d4f2',
      display: 'flex',
      fontFamily:'Inter',
      justifyContent: 'space-around',

    },
    // ticketsSold: {
    //   width: '50%',
    // },
    endingIn: {
      width: '50%',
    },
    ticketPrice: {
      width: '80%',
    },
    goToRaffle: {
      color: 'black',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    cardPrizesBadge: {
      fontSize: '12px',
      fontWeight: 'bold',
      width: '80px',
      textAlign: 'center',
      padding: '2px',
      position: 'absolute',
      top: '5px',
      left: '5px',
      color: 'black',
      // backgroundColor: theme.palette.secondary.main,
      backgroundColor: '#81d4f2',
      borderRadius: '2px',
      boxShadow: '0 2px 6px 0 #000',
    },
    cardEndedBadge: {
      fontSize: '12px',
      fontWeight: 'bold',
      width: '50px',
      textAlign: 'center',
      padding: '2px',
      position: 'absolute',
      top: '5px',
      right: '5px',
      color: 'red',
      backgroundColor: theme.palette.primary.main,
      borderRadius: '2px',
      boxShadow: '0 2px 6px 0 #000',
    },
    btnrefl: {
      fontSize: '20px',
      borderRadius: '25px',
      textTransform: 'capitalize',
      fontFamily: 'Angkor',
      height: 'max-content',
      minHeight:'40px',
      width: '220px',
      color: '#81d4f2',
      //fontWeight:'bolder',
    },
    
  })
);
