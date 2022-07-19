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
      console.log(data.data);
      let currntRaffle = data.data.filter((obj: any) => obj[0] === raffle.publicKey.toString())
      console.log(currntRaffle[0][1]);
      setCustomRaffleData(currntRaffle[0][1]);
    }
    getRaffles();

  },[])

  if (!raffle) return null;

  // const [num, setNum] = useState('');

  return (
    <>
      <div
        className="main"
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          border: '12px solid #81d4f2',
          borderRadius: '20px',
          marginBottom: '200px',
          padding: '1rem',
        }}
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
                        fontSize: '2.5rem',
                        textAlign: 'center',
                      }}
                    >
                      Prize {i + 1}
                    </div>
                    <div
                      style={{
                        width: '100%',
                        padding: '1rem',
                        marginTop: '1rem',
                        background: 'none',
                      }}
                    >
                      <img src={obj.meta.imageUri} alt="" style={{ width: '100%' }} />
                    </div>
                  </>
                );
              })}
            </Slider>
               <div style={{ textAlign: 'justify', color: 'white' }}>
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
              style={{
                fontFamily: 'Righteous',
                color: '#81d4f2',
                marginBottom: '0px',
                fontSize: '40px',
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
                  fontFamily: 'Poppins',

                  width: '100',
                }}
              >
                <tr>
                  <td>
                    <ConfirmationNumberOutlined
                      style={{
                        color: '#81d4f2 ',
                        fontSize: '50px',
                      }}
                    />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    Sold
                  </td>
                  <td style={{ fontSize: '18px', fontWeight: 400 }}>
                    {raffle.totalTickets}
                  </td>
                </tr>
                <tr>
                  <td>
                    <MdOutlineMilitaryTech
                      size="60"
                      style={{ color: '#81d4f2' }}
                    />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    winner
                    {raffle.prizes.length > 1 && 's'}
                  </td>
                  <td style={{ fontSize: '18px', fontWeight: 400 }}>
                    {raffle.prizes.length}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={valut} alt="" width={70} />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    Whitelist spots:
                  </td>
                  <td style={{ fontSize: '18px', fontWeight: 400 }}>
                    {raffle.prizes.length}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={reward} alt="" width={50} />
                  </td>
                  <td className="td-2" style={{ width: '100%' }}>
                    Collection Size:
                  </td>
                  <td style={{ fontSize: '24px', fontWeight: 400 }}>
                    {`${raffle.entrantsCap}`}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={price} alt="" width={40} />
                  </td>
                  <td className="td-2">Price:</td>
                  <td style={{ fontSize: '24px', fontWeight: 400 }}>
                    {getDisplayAmount(
                      raffle.proceeds.ticketPrice,
                      raffle.proceeds.mint
                    )}
                    {raffle.proceeds.mint.symbol}
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={time} alt="" width={40} />
                  </td>
                  <td className="td-2">Ends in:</td>
                  <td style={{ fontSize: '30px', fontWeight: 700 }}>
                    <div className={classes.countdown}>
                      {/* <BsStopwatch
                        size="24"
                        style={{
                          marginRight: '8px',
                          color: '#81d4f2',
                        }}
                      /> */}
                      <Countdown
                        style={{ fontSize: '18px' }}
                        endTimestamp={raffle.endTimestamp}
                      />
                    </div>
                  </td>
                </tr>
              </table>
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              style={{ width: '100%', margin: '2.5rem  auto' }}
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
                    <tr>
                      <td
                        style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          width: '100%',
                          padding: 'auto 1rem',
                        }}
                      >
                        Tickets are still available.
                      </td>
                      <td>
                        <WalletMultiButton
                          style={{
                            textAlign: 'center',
                            width: '15rem',
                            margin: 'auto',
                          }}
                          variant="contained"
                          color="secondary"
                          className={` ${classes.connectToBuyButton}`}
                        >
                          Connect to buy
                        </WalletMultiButton>
                      </td>
                    </tr>
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
