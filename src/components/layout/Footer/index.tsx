import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { useViewport } from '../../../hooks/useViewport';
import discordLogo from '../../../assets/discord-logo.svg';
import twitterLogo from '../../../assets/twitter-logo.svg';
import Mask2ndImg from '../../../assets/mask2ndImg.svg';
import Mask1stImg from '../../../assets/mask1stImg.svg';
import Diseno from '../../../assets/Diseno.png';
import { useStyles } from './styles';

const Footer: FC = () => {
  const { device } = useViewport();
  const classes = useStyles({
    device,
  });
  
  return (
    <div className={classes.root}>
      <div className={classes.socialLink}>
        {/* <Link target="blank" to={`https://solscan.io/token/discord`}> */}
          <img src={discordLogo} alt={'disord-logo'} className={classes.footerLogo}/>
          <div className={classes.maskDataIcons}>
              <a href="https://twitter.com/DefiGames_" target="_blank" style={{textDecoration: "none"}}><img src={Mask1stImg}  className={classes.img}
              /></a>
             <a href="https://discord.gg/defidistrict" target="_blank" style={{textDecoration: "none"}}><img src={Mask2ndImg} className={classes.img}/></a>
             <a href="https://www.magiceden.io/creators/defi_district" target="_blank" style={{textDecoration: "none"}}><img src={Diseno} className={classes.img} style={{padding:'0px'}}/></a>
            </div>
          <p className={classes.footerText}>© 2022, Defigames · All rights reserved</p>
        {/* </Link> */}
      </div>
      {/* <div className={classes.socialLink}>
        <Link target="blank" to={`https://solscan.io/token/twitter`}>
          <img src={twitterLogo} alt={'twitter-logo'} width="50px" />
        </Link>
      </div> */}
    </div>
  );
};

export default Footer;
