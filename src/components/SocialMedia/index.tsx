import { BsTwitter } from 'react-icons/bs';
import { FaDiscord, FaSearch } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import Grid from '@mui/material/Grid';
import magicicon from '../../assets/magiceden.svg';
const index = () => {
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
            // width: "50%",
            display: 'flex',
            justifyContent: 'center',
            // padding: 'auto 2rem',
          }}
        >
          <a href="#">
            <img
              src={magicicon}
              alt="icon"
              style={{
                background: '#140c19',
                borderRadius: '50%',
                width: '70px',
                height: '70px',
                padding: '6px 5px',
                boxSizing: 'border-box',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          <a href="#">
            <FaDiscord
              style={{
                color: 'white',
                padding: '5px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#5565fb',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          <a href="#">
            <BsTwitter
              style={{
                color: 'white',
                padding: '5px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#05a3f9',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          <a href="#">
            <TbWorld
              style={{
                color: '#18c0ee',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#fff',
                margin: 'auto 0.5rem',
              }}
            />
          </a>
          {/* <a href="#">
            <FaSearch
              style={{
                color: 'black',
                // margin: '3px auto auto 5px',
                padding: '1rem auto auto 1rem',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '10px solid #09ecb2',
                background: '#d73ee9',
                                margin: 'auto 0.5rem's
              }}
            />
          </a> */}
        </div>
      </Grid>
    </>
  );
};

export default index;
