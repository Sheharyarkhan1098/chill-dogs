import { Theme, alpha } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  walletConnectButton: {
    // width: '100%',
    textTransform: 'capitalize',
    //fontWeight: 'bolder',
    fontFamily: 'Poppins',
    backgroundColor: 'transparent',

    //boxShadow: '0 0 5px 2px #e86bff, inset 0 0 10px 0px #e86bff',
    color: '#D39ADD',
    fontSize:'20px',
    border: '2px solid #D39ADD',
    borderRadius: '30px',
    // minWidth: '120%',
    // '&:hover': {
    //   backgroundColor: 'white',
    //   borderColor: 'green',
    //   color: 'green',
    // border: '3px solid',
    // borderRadius: '30px',
    // minWidth: '120%',
    // },
  },
  walletDisconnectButton: {
    width: '100%',
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
    //fontWeight: 'bolder',
    fontSize:'20px',
    fontFamily: 'Poppins',

    //boxShadow: `0 0 5px 2px ${theme.palette.secondary.main}, inset 0 0 10px 0px ${theme.palette.secondary.main}`,
    color:'#D39ADD ',
    border: '2px solid #D39ADD',
    borderRadius: '30px',
    // '&:hover': {
    //   backgroundColor: 'white',
    //   borderColor: 'green',
    //   color: 'green',
    // border: '3px solid',
    // borderRadius: '30px',
    // },
  },
}));
