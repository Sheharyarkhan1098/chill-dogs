import { FC } from "react";
import { BsTwitter } from 'react-icons/bs';
import { FaDiscord, FaSearch } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import Grid from '@mui/material/Grid';
import magicicon from '../../assets/magiceden.svg';
import solscan from "../../assets/solscan.png"
const index: FC <any> = ({customRaffleData}) => {
  return (
    <>
      <Grid
        item
        xs={12}
        style={{
          margin: '0.5rem auto',
        }}
      >
        <div
          className="socailmedia"
          style={{
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <a href={customRaffleData.magicLink}>
            <img
              src={magicicon}
              alt="icon"
              className="magic-icon"
              style={{
                background: '#140c19',
                borderRadius: '50%',
                padding: '6px 5px',
                boxSizing: 'border-box',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          <a href={customRaffleData.discordLink}>
            <FaDiscord
            className="react-icons"
              style={{
                color: 'white',
                padding: '5px',
                borderRadius: '50%',
                background: '#5565fb',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          <a href={customRaffleData.twitterLink}>
            <BsTwitter
            className="react-icons"
              style={{
                color: 'white',
                padding: '5px',
                borderRadius: '50%',
                background: '#05a3f9',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          <a href={customRaffleData.websiteLink}>
            <TbWorld
            className="react-icons"
              style={{
                color: '#18c0ee',
                borderRadius: '50%',
                background: '#fff',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          <a href={customRaffleData.websiteLink}>
          <img
              src={solscan}
              alt="icon"
              className="solscan-icon"
              style={{
                background: 'none',
                borderRadius: '50%',
                padding: '10px',
                boxSizing: 'border-box',
                margin: '-6px auto auto',
              }}
            />
          </a>
        </div>
      </Grid>
    </>
  );
};

export default index;
