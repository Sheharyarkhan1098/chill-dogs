import { Theme } from '@material-ui/core';
import { makeStyles, alpha } from '@material-ui/core/styles';

import { DeviceType } from '../../providers/ViewportProvider';

export const useStyles = makeStyles<Theme, { device: DeviceType }>(
  (theme: Theme) => ({
    root: {
      width: '100%',
      height: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionTagline: {
      width: '100%',
      marginBottom: '20px',
    },
    textHighlight: {
      //fontWeight: 'bold',
      fontSize:'20px !important',
      color: '#81d4f2',
      marginBottom: '10px',
    },
    textHighlight1: {
      //fontWeight: 'bold',
      fontSize:'16px !important',
      // color: theme.palette.secondary.main,
      color: "#81d4f2",
      marginBottom: '10px',
    },
    topSection: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    raffleTitle: {
      color: "#81d4f2",
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      justifyItems: 'space-between',
    },
    leftTitleSection: {
      width: '10%',
      display: 'flex',
    },
    middleTitleSection: {
      width: '100%',
      display: 'flex',
      //paddingLeft:'20px',
      //justifyContent: 'center',
      textAlign: 'center',
      color: "#81d4f2"
    },
    rightTitleSection: {
      width: '10%',
    },
    backButton: {
      color: theme.palette.common.black,
      backgroundColor: alpha(theme.palette.secondary.main, 0.8),
      '&:hover': {
        boxShadow: `0px 0px 5px ${theme.palette.secondary.main}, inset 0px 0px 5px ${theme.palette.secondary.main}`,
        backgroundColor: alpha(theme.palette.secondary.main, 0.8),
      },
    },
    countdown: ({ device }) => ({
      width: '311px',
      fontFamily:'Poppins',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: '0px',
      fontSize: device === DeviceType.Phone ? '32px' : '60px',
      color: '#81d4f2',
      border: '1px solid #81d4f2',
      borderRadius: '40px',
      padding: '3px',
      WebkitTextStrokeWidth: '1px',
      //WebkitTextStrokeColor: theme.palette.secondary.main,
      //textShadow: `0 0 10px ${theme.palette.secondary.main}`,
    }),
    countdown1: ({ device }) => ({
      // width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      fontSize: device === DeviceType.Phone ? '32px' : '60px',
      color: 'white',
      border: '3px #227224 solid',
      borderRadius: '30px',
      backgroundColor: '#227224',
      padding: '5px 10px',
      WebkitTextStrokeWidth: '1px',
      //WebkitTextStrokeColor: theme.palette.secondary.main,
      //textShadow: `0 0 10px ${theme.palette.secondary.main}`,
    }),
    countdown2: ({ device }) => ({
      width: '50%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      fontSize: device === DeviceType.Phone ? '32px' : '60px',
      color: 'white',
      border: '3px #227224 solid',
      borderRadius: '30px',
      backgroundColor: '#227224',
      padding: '5px 10px',
      WebkitTextStrokeWidth: '1px',
      //WebkitTextStrokeColor: theme.palette.secondary.main,
      //textShadow: `0 0 10px ${theme.palette.secondary.main}`,
    }),
    mainContent: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      fontFamily:'Inter',
      //justifyContent: 'flex-end',
    },
    prizesSection: {
      //width: '70%',
      display: 'flex',
      flexDirection: 'column',
      paddingRight: '20px',
      //minHeight: '450px',
      justifyContent: 'center',
      //alignItems: 'center',
    },
    prizesHeader: {
      marginBottom: '10px',
    },
    labelPrizeAmount: {
      marginLeft: '5px',
      color: theme.palette.secondary.main,
      textTransform: 'initial',
      '&:hover': {
        textShadow: `0px 0px 5px ${theme.palette.secondary.main}`,
        backgroundColor: 'transparent',
        textDecoration: 'none',
      },
    },
    seeAllPrizesLabel: {},
    detailsSection: ({ device }) => ({
      paddingTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      width: '30%',
      minWidth: device === DeviceType.Phone ? '256px' : '313px',
      maxWidth: device === DeviceType.Phone ? '380px' : '380px',
      maxHeight: '500px',
    }),
    actionSectionContainer: {
      padding: '20px 0 20px 0',
    },
    actionSectionInner: {
      padding: '10px 0',
      width: '90%',
      textAlign: 'center',
    },
    connectToBuyButton: {
      width: '35%',
      fontFamily:'Inter',
      borderRadius:'25px',
      height: 'max-content',
      minHeight:'50px',
      fontWeight:'bolder',
      background: 'none',
      color: "white",
      border: "1px solid white"
    },
    connectToBuyButton1: {
      width: '100',
      fontFamily:'Inter',
      borderRadius:'25px',
      height: 'max-content',
      minHeight:'30px',
      fontWeight:'bolder',
      background: 'none',
      color: "white",
      border: "1px solid white"
    },
    scrollIcon: {
      color: 'black',
      transform: `rotate(90deg)`,
      fontSize: '50px',
      opacity: '0.6',
      marginTop: '20px',
      marginBottom: '60px',
    },
    spacer: {
      width: '100%',
      height: '20px',
    },
  })
);
