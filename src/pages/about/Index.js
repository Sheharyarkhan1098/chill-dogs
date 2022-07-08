import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@mui/material/Container';
import Style from './Style';
import Navigation from '../../components/layout/WalletButton/index';
import Footer from '../../components/layout/Footer/index';
import MaskGroup from '../../assets/MaskGroup.svg';
import Mask2ndImg from '../../assets/mask2ndImg.svg';
import Mask1stImg from '../../assets/mask1stImg.svg';
import {Link} from 'react-router-dom';
const Index = () => {
  return (
    <Style>
      <Navigation />
      {/* <Container maxWidth="xl"> */}
      <section className="top-header">
        <div className="header-container">
          <h1 className="main-heading">The decentralized place to play with your crypto.</h1>
          <p className="paragraph">
          Defi Games is the gaming center for the Solana blockchain. Players can wage, bid, raffle, and compete in a fleet of our custom built smart contracts designed to give you a chance at 1-10x your earnings. Choose Solana or your favorite SPL token like $LUV or $DUST and embark on your next degenerate journey.
          </p>
        
         <Link to="/raffles"> <button className="header-button" >VIEW RAFFLES</button></Link>
        </div>
      </section>
      <section className="our-games">
        <h1 className="games-heading">Discover our games</h1>
        <div className="images-section">
          <div className="raffles">
            <div className="raffles-data">
              <h6>Raffles</h6>
              <p>Peer to peer raffles with 50% less fees than the leading raffle sites.</p>
            </div>
          </div>
          <div className="auctions">
            <div className="raffles-data">
              <h6>Auctions</h6>
              <p>Bid on your favorite NFT, 1 of 1 art work, or digital/physical goods. </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mask-group">
        <div className="mask-group-data">
        
          <img
            src={MaskGroup}
            alt="Mask_Gropup_Image"
            className="mask-group-image"
          />
         
          <div className="mask-data">
            {/* <div className="mask-data-heading">
              {' '}
              The defi platform to bid on NFt's and enter raffles
            </div>
            <div className="mask-data-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              metus nullam magnis pharetra lacus, arcu nec lacinia mauris.
            </div> */}
            {/* <div className="mask-data-icons">
              <a href="https://twitter.com/DefiGames_" target="_blank" style={{textDecoration: "none"}}><img src={Mask1stImg} /></a>
              <img src={Mask2ndImg} />
            </div> */}
          </div>
        </div>
      </section>
      {/* <section className="faqs">
        <h1 className="faqs-heading">Faqs</h1>
        <div className="faqs-container">
          <Accordion style={{background:'#271A4B',borderRadius:'100px' ,padding:'10px 40px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color:'#D39ADD',width:'24px', height:'24px'}} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="question">How do I take part in the competition?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{color:'white'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{background:'#271A4B',borderRadius:'100px' ,padding:'10px 40px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color:'#D39ADD',width:'24px', height:'24px'}} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="question">What are the benefits of partaking?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{color:'white'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{background:'#271A4B',borderRadius:'100px' ,padding:'10px 40px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color:'#D39ADD',width:'24px', height:'24px'}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="question">How does this work?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{color:'white'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{background:'#271A4B',borderRadius:'100px' ,padding:'10px 40px'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color:'#D39ADD',width:'24px', height:'24px'}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="question">Who do I contact if I need assistance?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography style={{color:'white'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </section> */}
      <Footer />
      {/* </Container> */}
    </Style>
  );
};

export default Index;
