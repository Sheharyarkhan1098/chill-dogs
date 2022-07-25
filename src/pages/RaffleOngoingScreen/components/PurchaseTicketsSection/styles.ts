import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '15px 20px 15px 20px',
  },
  titleSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: '15px',
  },
  amountLabel: {
    width: '100%',
    display: 'flex',
  },
  ticketAmountSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginBottom: '15px',
    background: "#000000"
  },
  ticketAmountSectionLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: 'white',
    borderRadius:'10px',
    backgroundColor:'#D39ADD',
  },
  ticketAmountSectionMiddle: {
    width: '300px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    border:'none',
    padding:  '2rem'
  },
  ticketAmountSectionRight: {
    // width: '100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    color: 'white',
    borderRadius:'15px',
    backgroundColor:'#D39ADD',
  },
  changeTicketAmountButton: {
    color: 'white',
    backgroundColor:'#D39ADD',
  },
  ticketAmountTextField: {
    width: '40%',
    height: '100%',
    border:'none',
    outline:"none",
    resize: 'none',
    color :"#FFF",
    textAlign:"center"
    // '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //   //borderColor: theme.palette.primary.main,
    // },
    // '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //   // borderColor: '#227224',
    // },
    // '& .MuiOutlinedInput-input': {
    //   color: 'black',
    //   textAlign: 'center',
    //   fontSize: '15px',
    // },
    // '& .MuiOutlinedInput-adornedStart': {
    //   paddingLeft: '8px',
    // },
    // '& .MuiOutlinedInput-adornedEnd': {
    //   paddingRight: '8px',
    // },
  },
  maxButton: {
    color: 'white',
    backgroundColor:'#227224',
    fontSize: '15px',
    width: '30px',
    minWidth: '30px',
    padding: 0,
    // '&:hover': {
    //   backgroundColor: 'transparent',
    // },
  },

  priceSection: {
    width: '100%',
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '10px',
  },
  priceLabel: {
    margin: '-5px 0 -5px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paymentOptionSection: {
    width: '100%',
    display: 'flex',
  },
  basketPrice: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  paymentOptionSelect: {
    width: '100%',
    height: '50px',
    marginTop: '-10px',
    padding: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  paymentOptionSelection: {
    padding: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentOptionMenu: {
    padding: '0 10px 0 0',
    margin: '5px 10px 5px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paymentOptionLogoContainer: {
    height: '30px',
    width: '30px',
    margin: '5px 10px 5px 10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paymentOptionLogo: {
    height: '100%',
    borderRadius: '50%',
  },

  buySection: {
    // width: '100%',
    // display: 'flex',
    //flexDirection: 'column',
  },
  purchaseButtonContent: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius:'20px',
    //width: '100%',
    //height: '100%',
    fontFamily:'Inter',
    textTransform: 'none',
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseButtonContentLeft: {
    width: '20%',
    fontFamily:'Inter',
    display: 'flex',
    justifyContent: 'center',
  },
  purchaseButtonContentMiddle: {
    width: '60%',
    color: "white",
  },
  purchaseButtonContentRight: {
    width: '20%',
  },
  purchaseSpinner: {
    //height: '50px',
    // color: theme.palette.secondary.main,
    color: "white",
  },
  walletBalance: {
    marginTop: '5px',
    fontSize: '12px',
    color: '#777',
    textAlign: 'left',
  },
}));
