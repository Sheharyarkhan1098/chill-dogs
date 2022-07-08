import { FC, useMemo, useRef } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import { ArrowBack, DoubleArrow } from '@material-ui/icons';
import { Button, IconButton, Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import { BsStopwatch, BsDiscord, BsTwitter } from "react-icons/bs";
import { useProgramApis } from '../../hooks/useProgramApis';
import { Raffle } from '../../lib/types';
import Countdown from '../../components/Countdown';
import PrizeShowcaseOngoing from './components/PrizeShowcaseOngoing';
import RaffleInfoSection from '../../components/RaffleInfoSection';
import { PurchaseTickets } from './components/PurchaseTicketsSection/PurchaseTicket';
import { routes } from '../../router/routes';
import Screen from '../../components/layout/Screen';
import useCommonStyles from '../../assets/styles';
import { useStyles } from './styles';
import PrizeGalleryOngoing from './components/PrizeGalleryOngoing';
import { useViewport } from '../../hooks/useViewport';
import { DeviceType } from '../../providers/ViewportProvider';
import Spacer from '../../components/Spacer';
import { styled } from '@mui/material/styles';
import { getDisplayAmount } from '../../lib/accounts';
import useMediaQuery from '@mui/material/useMediaQuery';
import Footer from '../../components/layout/Footer/index';
import { Container, Stack, Paper } from '@mui/material';

interface IRaffleOngoingScreenProps {
  raffle: Raffle;
  updateRaffle: () => void;
}


const RaffleOngoingScreen: FC<IRaffleOngoingScreenProps> = ({
  raffle,
  updateRaffle,
}) => {
  const { device } = useViewport();
  const classes = { ...useCommonStyles(), ...(useStyles({ device }) as any) };
  const { push } = useHistory();
  const { draffleClient } = useProgramApis();

  const prizeGalleryRef = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery('(max-width:600px)');

  const entrant = useMemo(() => {
    if (!draffleClient.provider.wallet?.publicKey) return;
    return raffle?.entrants.get(
      draffleClient.provider.wallet.publicKey.toString()
    );
  }, [raffle, draffleClient.provider.wallet?.publicKey]); // "Unnecessary" dependency required due to React not picking up change in publicKey subfield

  if (!raffle) return null;

  return (
    <>
      <div className={classes.root}>
        {/* {device === DeviceType.Phone ? (

        </>
      ) : (
        <> */}

        <Container fixed style={{ backgroundColor: 'rgba(0,0,0,0.8)', border: "12px solid #81d4f2", borderRadius: '20px', padding: '50px', marginBottom:'81px' }}>

          {/* <div className={classes.topSection}>
            <div className={classes.raffleTitle}>
              <div className={classes.leftTitleSection}>
                <IconButton
                  size="medium"
                  className={classes.backButton}
                  onClick={() => push(routes.RAFFLES)}
                >
                  <ArrowBack />
                </IconButton>
              </div>
              <div className={classes.middleTitleSection}>
                <Typography variant="h1">{`> ${raffle.metadata.name}`}</Typography>
              </div>
              <div className={classes.rightTitleSection}></div>
            </div>
            <div className={classes.countdown}>
              <Countdown endTimestamp={raffle.endTimestamp} spacing={'5%'} />
              <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '-2px' }} />

            <Countdown endTimestamp={raffle.endTimestamp} />
              
            </div>
          </div> */}

          {/* <div className={classes.mainContent}> */}
          {/* <div className={classes.prizesSection}>
                <Typography variant="overline" className={classes.prizesHeader}>
                Prizes
                {raffle.prizes.length > 3 && (
                  <>
                    {' -'}
                    <Button
                      className={classes.labelPrizeAmount}
                      variant="text"
                      disableRipple
                      onClick={() =>
                        prizeGalleryRef.current?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }
                    >
                      <span>See all {raffle.prizes.length}</span>
                    </Button>
                  </>
                )}
              </Typography>
                <PrizeShowcaseOngoing prizes={raffle.prizes} />
              </div> */}

          <Grid container style={{ width: 'auto', justifyContent: "center" }}>
            <Grid item xs={12} sm={12} md={5} lg={4} style={{ justifyContent: "center" }}>
              {/* <div className={classes.prizesSection}> */}
              <PrizeShowcaseOngoing prizes={raffle.prizes} />
              {/* </div> */}
            </Grid>


            {matches ?

              <Grid item xs={12} sm={12} md={6} lg={8} style={{ height: 'max-content' }}>

                <Typography component="div" style={{ display: "block", alignItems: "center", margin: "0 0 10px" }} >
                  <span style={{ justifyContent: 'space-around', display: 'flex' }}>
                    <div className={classes.middleTitleSection}>
                      <Typography variant="h1" style={{ fontFamily: "Righteous", color: '#81d4f2', marginBottom: '0px' }}>
                        {` ${raffle.metadata.name}`}</Typography>

                    </div></span>
                  <span style={{ justifyContent: 'space-around', display: 'flex' ,marginTop:'15px'}}>
                    <div className={classes.countdown}>
                      <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '5px' ,color:"#81d4f2"}} />
                      <Countdown style={{ fontSize: '20px' }} endTimestamp={raffle.endTimestamp} />
                    </div>
                  </span>
                </Typography>
                <Typography component="div" style={{ display: "block", margin: "0 0 10px" }} >
                  <span style={{ justifyContent: 'space-around', display: 'flex' ,marginTop:'15px'}}>
                    <div className={classes.middleTitleSection}>
                      <RaffleInfoSection
                        raffle={raffle}
                        userConnected={!!draffleClient.provider.wallet.publicKey}
                        userTickets={entrant?.tickets}
                      />
                    </div>
                  </span>
                  <span style={{ justifyContent: 'space-around', display: 'flex' ,marginTop:'10px',marginBottom:'15px'}}>

                    {/* <div className={classes.countdown2}>
                      <BsTwitter size={24} style={{ marginRight: '10px' }} />
                      <BsDiscord size={24} />
                    </div> */}
                  </span>
                </Typography>
                <Typography component="div" style={{backgroundColor: '#000000', borderRadius: '20px', padding: '10px', display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%", margin: "0 0 10px" }} >
                  <Typography variant="body2" style={{ color: '#81d4f2', fontFamily: 'Poppins',fontSize:'12px' }}><span>Whitelist spots</span><br />
                    <span style={{ fontSize: '15px', fontWeight:700}}>
                      {raffle.prizes.length}</span>
                  </Typography>
                  <Typography variant="body2" style={{ color: '#81d4f2', fontFamily: 'Poppins',fontSize:'12px' }}><span>Collection Size</span><br />
                    <span style={{ fontSize: '15px', fontWeight:700 }}>{`${raffle.entrantsCap}`}</span>
                  </Typography>
                  <Typography variant="body2" style={{ color: '#81d4f2', fontFamily: 'Poppins',fontSize:'12px' }}><span>Price</span><br />
                    <span style={{ fontSize: '15px', fontWeight:700}}>
                      {getDisplayAmount(
                        raffle.proceeds.ticketPrice,
                        raffle.proceeds.mint
                      )}{' '}
                      {raffle.proceeds.mint.symbol}</span>
                  </Typography>
                </Typography>
                <Typography component="div" style={{ alignItems: "center", marginTop: "30px", }} >
                  {draffleClient.provider.wallet.publicKey ? (
                    <PurchaseTickets
                      raffle={raffle}
                      updateRaffle={updateRaffle}
                    />
                  ) : (
                    <ConnectActionSection />
                  )}
                </Typography>

              </Grid>

              :


              // ------------------------------this is 600 + section 

              <Grid item xs={12} sm={12} md={7} lg={8} style={{ height: 'max-content' }}>

                <Typography component="div" style={{ display: "flex", alignItems: "center", margin: "0 0 10px" }} >
                  <div className={classes.middleTitleSection}>
                    <Typography variant="h1" style={{ fontFamily: "Righteous", color: '#81d4f2', marginBottom: '0px' ,fontSize:'40px',}}>
                      {` ${raffle.metadata.name}`}</Typography>

                  </div>
                  <div className={classes.countdown}>
                    <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '5px',color:"#81d4f2" }} />
                    <Countdown style={{ fontSize: '24px' }} endTimestamp={raffle.endTimestamp} />
                  </div>
                </Typography>
                <Typography component="div" style={{ display: "flex", alignItems: "center", marginBottom:'47px' }} >
                  <div className={classes.middleTitleSection}>
                    <RaffleInfoSection
                      raffle={raffle}
                      userConnected={!!draffleClient.provider.wallet.publicKey}
                      userTickets={entrant?.tickets}
                    />
                  </div>
                  {/* <div className={classes.countdown1}>
                    <BsTwitter size={24} style={{ marginRight: '10px' }} />
                    <BsDiscord size={24} />
                  </div> */}
                </Typography>
                <Typography component="div" style={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '20px', padding: '30px', display: "flex", alignItems: "center", justifyContent: "space-around", width: "70%", margin: "0 0 10px" }} >
                  <Typography variant="body2" style={{ color: '#81d4f2', fontFamily: 'Poppins' }}><span style={{ fontSize: '18px',fontWeight:400 }}>Whitelist spots</span><br />
                    <span style={{ fontSize: '30px', fontWeight:700 }}>
                      {raffle.prizes.length}</span>
                  </Typography>
                  <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: '18px', fontWeight:400 }}>Collection Size</span><br />
                    <span style={{ fontSize: '30px', fontWeight:700 }}>{`${raffle.entrantsCap}`}</span>
                  </Typography>
                  <Typography variant="body2" style={{ fontFamily: 'Poppins', color: '#81d4f2' }}><span style={{ fontSize: '18px',fontWeight:400 }}>Price</span><br />
                    <span style={{ fontSize: '30px', fontWeight:700 }}>
                      {getDisplayAmount(
                        raffle.proceeds.ticketPrice,
                        raffle.proceeds.mint
                      )}{' '}
                      {raffle.proceeds.mint.symbol}</span>
                  </Typography>
                </Typography>
                <Typography component="div" style={{ alignItems: "center", marginTop: "30px", }} >
                  {draffleClient.provider.wallet.publicKey ? (
                    <PurchaseTickets
                      raffle={raffle}
                      updateRaffle={updateRaffle}
                    />
                  ) : (
                    <ConnectActionSection />
                  )}
                </Typography>

              </Grid>

            }



            {/* <Stack>
                    <div className={classes.countdown}>

                      <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '5px' }} />
                      <Countdown style={{ fontSize: '24px' }} endTimestamp={raffle.endTimestamp} />
                    </div>

                  </Stack>
                  <Stack style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                    <div className={classes.countdown1}>
                      <BsTwitter size={24} style={{ marginRight: '10px' }} />
                      <BsDiscord size={24} />
                    </div>
                  </Stack> */}


            {/* <Grid item xs={12} md={2}>
                  <RaffleInfoSection
                      raffle={raffle}
                      userConnected={!!draffleClient.provider.wallet.publicKey}
                      userTickets={entrant?.tickets}
                    />
                </Grid> */}

            {/* <Grid item xs={12} sm={12} md={4} style={{ height: 'max-content' }}>
                  <div className={classes.countdown}>
                    <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '5px' }} />
                    <Countdown style={{ fontSize: '24px' }} endTimestamp={raffle.endTimestamp} />
                  </div>
                </Grid> */}


            {/* <Grid item xs={12} sm={12} md={10} style={{ height: 'max-content' }}>

                  <div className={classes.middleTitleSection}>
                    <RaffleInfoSection
                      raffle={raffle}
                      userConnected={!!draffleClient.provider.wallet.publicKey}
                      userTickets={entrant?.tickets}
                    />
                  </div>

                </Grid>

                <Grid item xs={12} sm={12} md={2} style={{ height: 'max-content' }}>

                  <div className={classes.countdown1}>
                    <BsTwitter size={24} style={{ marginRight: '10px' }} />
                    <BsDiscord size={24} />
                  </div>

                </Grid> */}

            {/* <Grid item xs={12} sm={8} md={12}>
                  <Stack style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <div className={classes.countdown}>
                      
                      <BsStopwatch size="24" style={{ marginRight: '8px', marginTop: '5px' }} />
                      <Countdown style={{ fontSize: '24px' }} endTimestamp={raffle.endTimestamp} />
                    </div>

                  </Stack>
                  <Stack style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
                    <div className={classes.countdown1}>
                      <BsTwitter size={24} style={{ marginRight: '10px' }} />
                      <BsDiscord size={24} />
                    </div>
                  </Stack>
                </Grid> */}


            {/* <Grid container direction="row" style={{width:'max-content', display: 'flex', backgroundColor: '#F3F5F2', marginTop: '-60', maxHeight: 'max-content', borderRadius: '40px', padding: '20px' }}>
                  <Grid item xs={12}  md={4} >

                    <Typography variant="body2" style={{ color: 'black' }}><span style={{ position: 'absolute' }}>Collection Size</span><br />{`${raffle.entrantsCap}`}</Typography>

                  </Grid>
                  <Grid item xs={12} md={4} >


                    <Typography variant="body2" style={{ color: 'black' }}><span style={{ position: 'absolute' }}>Collection Size</span><br />
                      <span style={{ fontWeight: 'bolder', fontSize: '22px', display: 'flex' }}>{`${raffle.entrantsCap}`}</span>
                    </Typography>


                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" style={{ color: 'black' }}><span style={{ position: 'absolute' }}>Price</span><br />
                      <span style={{ fontWeight: 'bolder', fontSize: '22px', display: 'flex' }}>
                        {getDisplayAmount(
                          raffle.proceeds.ticketPrice,
                          raffle.proceeds.mint
                        )}{' '}
                        {raffle.proceeds.mint.symbol}</span>
                    </Typography>
                  </Grid>
                </Grid> */}

          </Grid>





          {/* <div className={classes.detailsSection}>
                <RaffleInfoSection
                  raffle={raffle}
                  userConnected={!!draffleClient.provider.wallet.publicKey}
                  userTickets={entrant?.tickets}
                /> */}
          {/* <div className={classes.actionSectionContainer}>
                  {draffleClient.provider.wallet.publicKey ? (
                    <PurchaseTickets
                      raffle={raffle}
                      updateRaffle={updateRaffle}
                    />
                  ) : (
                    <ConnectActionSection />
                  )}
                </div> */}
          {/* </div> */}
          {/* </div> */}
          {raffle.prizes.length > 1 && (
            <>
              <DoubleArrow className={classes.scrollIcon} />
              <PrizeGalleryOngoing
                raffle={raffle}
                scrollRef={prizeGalleryRef}
              />
            </>
          )}
        </Container>

      </div>
    </>
  );
};

const ConnectActionSection: FC = () => {
  const { device } = useViewport();
  const matches = useMediaQuery('(max-width:600px)');

  const classes = { ...useCommonStyles(), ...(useStyles({ device }) as any) };

  return (
    <>

      {/* <div style={{ display: 'flex', justifyContent: 'space-between', flex: 'row' }}> */}
      <Grid container direction="row" style={{ display: 'flex' }}>
        {/* <Grid item xs={12} sm={12} md={4} lg={4} style={{ height: 'max-content', display: 'flex', borderRadius: '20px', border: '1px solid #C7C7C7' }}>


            <Typography variant="h3" className={classes.textHighlight}>
              Tickets are still available.
            </Typography>
            <Typography variant="body1">Don't miss out!</Typography>



          </Grid> */}


        {matches

          ?

          <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'block', alignItems: 'baseline' }}>
            {/* <div className={classes.buySection} style={{ display: 'flex', justifyContent: 'space-between' }}> */}

            <div className={classes.actionTagline} style={{ marginRight: '20px' }}>
              <Typography variant="h6" className={classes.textHighlight1} style={{ width: 'max-content', fontFamily: 'Poppins', color:'white' }}>
                Tickets are still available.
              </Typography>
              {/* <Typography variant="body1">Don't miss out!</Typography> */}
            </div>
            <WalletMultiButton
              variant="outlined"
              color="secondary"
              className={`${classes.mainButton} ${classes.connectToBuyButton1}`}
            >
              Connect to buy
            </WalletMultiButton>

            {/* </div> */}
          </Grid>

          :

          <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', alignItems: 'baseline' }}>
            {/* <div className={classes.buySection} style={{ display: 'flex', justifyContent: 'space-between' }}> */}

            <div className={classes.actionTagline} style={{ marginRight: '50px' }}>
              <Typography variant="h4" className={classes.textHighlight} style={{ width: 'max-content', fontFamily: 'Poppins' }}>
                Tickets are still available.
              </Typography>
              {/* <Typography variant="body1">Don't miss out!</Typography> */}
            </div>
            <WalletMultiButton
              variant="contained"
              color="secondary"
              className={` ${classes.connectToBuyButton}`}
            >
              Connect to buy
            </WalletMultiButton>

            {/* </div> */}
          </Grid>

        }
      </Grid>

      {/* </div> */}

      {/* <div className={classes.actionSection}>
        <div className={classes.actionSectionInner}>
          <div className={classes.actionTagline}>
            <Typography variant="h3" className={classes.textHighlight}>
              Tickets are still available.
            </Typography>
            <Typography variant="body1">Don't miss out!</Typography>
          </div>
          <WalletMultiButton
            variant="outlined"
            color="secondary"
            className={`${classes.mainButton} ${classes.connectToBuyButton}`}
          >
            Connect to buy
          </WalletMultiButton>
        </div>
      </div> */}
    </>
  );
};

interface IRaffleOngoingDetailsProps {
  raffle: Raffle;
  updateRaffle: () => void;
}

const RaffleOngoingScreenWithLayout: FC<IRaffleOngoingDetailsProps> = (
  props
) => {
  const { push } = useHistory();

  console.log("raffle ongoing screen")

  return (
    <Screen onBackNavigation={() => push(routes.RAFFLES)}>
      <RaffleOngoingScreen {...props} />
      {/* <Footer/> */}
    </Screen>
  );
};

export default RaffleOngoingScreenWithLayout;
