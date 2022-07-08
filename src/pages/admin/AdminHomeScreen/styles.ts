import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    "& .MuiFormLabel-root": {
      color: "white" 
    },
   " & .MuiPaginationItem-root": {
      color: "#fff"
    }
  },
  raffleGrid: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  raffleGridItem: {
    width: '100%',
    //height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  raffleCard: {
    width: '180px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletButtonContainer: {
    margin: '20px 0 0 0',
  },
  textFormStyle: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
   
  },
  textFormStyle2: {
    display: 'flex',
    justifyContent: 'center',

  }
  , textFieldSx: {
    width: '65%',
    fontFamily: 'Poppins',
    color:'white !important'
  },
  indicator: {
    backgroundColor: "rgb(23, 34, 37)",
    color: 'white',
    borderRadius: '15px 15px 0px 0px',
  },
}));
