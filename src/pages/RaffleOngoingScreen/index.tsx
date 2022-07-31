import { FC, useMemo, useRef, useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import { DoubleArrow } from '@material-ui/icons';
import { Typography, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useProgramApis } from '../../hooks/useProgramApis';
import { Raffle } from '../../lib/types';
import Countdown from '../../components/Countdown';
import PrizeShowcaseOngoing from './components/PrizeShowcaseOngoing';
import { MdOutlineMilitaryTech } from 'react-icons/md';
import { ConfirmationNumberOutlined } from '@material-ui/icons';

import { PurchaseTickets } from './components/PurchaseTicketsSection/PurchaseTicket';
import { routes } from '../../router/routes';
import Screen from '../../components/layout/Screen';
import useCommonStyles from '../../assets/styles';
import { useStyles } from './styles';
import PrizeGalleryOngoing from './components/PrizeGalleryOngoing';
import { useViewport } from '../../hooks/useViewport';
// import { DeviceType } from '../../providers/ViewportProvider';
// import Spacer from '../../components/Spacer';
// import { styled } from '@mui/material/styles';
import { getDisplayAmount } from '../../lib/accounts';
import useMediaQuery from '@mui/material/useMediaQuery';
// import Footer from '../../components/layout/Footer/index';
import { Container } from '@mui/material';
import magicicon from '../../assets/magiceden.svg';
import SocialMedia from '../../components/SocialMedia';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slide from '../../assets/slide2.png';
import valut from '../../assets/valut.png';
import time from '../../assets/19.png';
import reward from '../../assets/reward.png';
import price from '../../assets/price.png';
import axios from "axios";

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
  const [customRaffleData, setCustomRaffleData] = useState<any>({});

  const prizeGalleryRef = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery('(max-width:600px)');

  const entrant = useMemo(() => {
    if (!draffleClient.provider.wallet?.publicKey) return;
    return raffle?.entrants.get(
      draffleClient.provider.wallet.publicKey.toString()
    );
  }, [raffle, draffleClient.provider.wallet?.publicKey]); // "Unnecessary" dependency required due to React not picking up change in publicKey subfield
  
  const base_url = "https://raffles.chilldogsclub.com";

  useEffect(() => {
    const getRaffles = async () =>  {
      const data = await axios.get(`${base_url}/get-Raffles`);
      console.log(data.data, "allData");
      let currntRaffle = data.data.filter((obj: any) => obj[0] === raffle.publicKey.toString())
      console.log(currntRaffle[0][1], "customRaffle");
      setCustomRaffleData(currntRaffle[0][1]);
    }
    getRaffles();

  },[])

  if (!raffle) return null;

  // const [num, setNum] = useState('');
  console.log(raffle, "raffle")
  return (
    <>
      <div
        className="main"
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={4} lg={4} xl={3}>
            <div className="index-prize"></div>
            <Slider>
              {raffle?.prizes?.map((obj, i) => {
                return (
                  <>
                    <div
                      className="prize-tag"
                      style={{
                        color: '#000',
                        zIndex: '2',
                        fontWeight: '900',
                        textAlign: 'center',
                      }}
                    >
                      Prize {i + 1}
                    </div>
                    <div
                      style={{
                        width: '100%',
                        paddingLeft: '2rem ',
                        background: 'none',
                      }}
                    >
                      <img src={obj.meta.imageUri} alt="" style={{width: '100%'}} />
                    </div>
                  </>
                );
              })}
            </Slider>
               <div className='description' style={{ textAlign: 'justify', color: 'white' }}>
                      <h2 style={{ textAlign: 'center' }}>Description</h2>
                      <div>
                        {/* Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled. */}
                        {customRaffleData?.description}
                      </div>
                    </div>
          </Grid>
          <Grid item xs={12} md={7} lg={8} xl={8}>
            <Typography
              variant="h1"
              className="name-title"
              style={{
                fontFamily: 'Rubik Wet Paint',
                color: '#81d4f2',
                marginBottom: '0px',
                textAlign: 'center',
              }}
            >
              {` ${raffle.metadata.name}`}
            </Typography>
            <Grid
              item
              xs={12}
              style={{
                margin: '0.5rem auto',
              }}
            >
              {customRaffleData && 
                  <SocialMedia customRaffleData={customRaffleData} />
                  }
            </Grid>

            <Grid item xs={12} lg={8} style={{ width: '100%', margin: 'auto' }}>
              <table
                style={{
                  color: '#81d4f2',
                  width: '100',
                }}
              >
                <tr>
                  <td>
                      <img src={valut} alt="" 
                         className="my-ticket-icon" />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    {/* Sold */}
                    Total Entries: <span className="span-12">{raffle.totalTickets} / {raffle.entrantsCap}</span>
                  </td>
                  
                </tr>
                
                <tr>
                  <td>
                  <img src={valut} alt="" 
                         className="my-ticket-icon" />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    {/* Whitelist spots: */}
                    My Ticket: <span className="span-12">{entrant?.tickets?.length || 0}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                  <img src={price} alt="" className='price-icon' />
                  </td>
                  <td className="td-2">Price: <span className="span-12">{getDisplayAmount(
                      raffle.proceeds.ticketPrice,
                      raffle.proceeds.mint
                    )}
                    {raffle.proceeds.mint.symbol}</span></td>
                </tr>
                <tr>
                  <td>
                  <img src={reward} alt="" 
                         className="reward-icon"/>
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    {/* Collection Size: */}

              

                    Result:
                  
                    {/* {`${raffle.entrantsCap}`} */}
                     <span className="span-12">
                      {'N/A or Congrats'}
   </span>
                  </td>
                </tr>               
                <tr>
                  <td>
                  <img src={time} alt=""  className="time-icon" />
                  </td>
                  <td className="td-2 end-text" style={{display: 'flex'}}>Ends in: <span className="span-12"><Countdown
                        style={{ fontSize: '18px',  fontFamily: "'Ceviche One', cursive", width:"10rem" }}
                        endTimestamp={raffle.endTimestamp}
                      /></span></td> 
                </tr>
              </table>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              style={{ width: '100%', margin: '1.5rem  auto auto'  }}
            >
              <table
                // className="btn-table"
                style={{
                  width: '100%',
                  color: '#81d4f2',
                  fontFamily: 'Poppins',
                }}
              >
                {draffleClient.provider.wallet.publicKey ? (
                  <>
                    <PurchaseTickets
                      raffle={raffle}
                      updateRaffle={updateRaffle}
                    />
                  </>
                ) : (
                  <>
                    <tr className="desktop-connect">
                      <td>
                        Tickets are still available.
                      </td>
                      <td className='clock-btn' >
                        <WalletMultiButton
                          style={{
                           background: 'none',
                            fontFamily: "'Ceviche One', cursive" 

                          }}
                          variant="contained"
                          color="secondary"
                          // className={` ${classes.connectToBuyButton}`}
                        >
                          Connect to buy
                        </WalletMultiButton>
                      </td>
                    </tr>
                    <div className='mobile-connect'>
                      <div>
                      Tickets are still available.
                      </div>

                          <div  className='clock-btn' style={{ marginTop: "1rem",}} >
                          <WalletMultiButton
                          style={{
                           background: 'none',
                            fontFamily: "'Ceviche One', cursive" 
                          

                          }}
                          variant="contained"
                          color="secondary"
                          // className={` ${classes.connectToBuyButton}`}
                        >
                          Connect to buy
                        </WalletMultiButton>
                          </div>
                    </div>
                  </>
                )}
              </table>
            </Grid>
            {/* {raffle.prizes.length > 1 && (
              <>
                <DoubleArrow className={classes.scrollIcon} />
                <PrizeGalleryOngoing
                  raffle={raffle}
                  scrollRef={prizeGalleryRef}
                />
              </>
            )} */}
          </Grid>
        </Grid>
      </div>
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

  console.log('raffle ongoing screen');

  return (
    <Screen onBackNavigation={() => push(routes.RAFFLES)}>
      <RaffleOngoingScreen {...props} />
      {/* <Footer/> */}
    </Screen>
  );
};

export default RaffleOngoingScreenWithLayout;
