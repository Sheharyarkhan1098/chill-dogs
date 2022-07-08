import styled from 'styled-components';
import Header from '../../assets/headerBackground.png';
import Raffles from '../../assets/raffles.png';
import Auctions from '../../assets/auctions.png';
import MaskBackground from '../../assets/maskBackground.png';

const Style = styled.div`
  background: #000000;
  padding-bottom: 200px;
  .top-header {
    background: url(${Header});
    background-repeat: no-repeat;
    height: 787px;
    width: 100%;
    background-size: cover;
    background-position: center;
    text-align: center;
    padding-bottom: 20px;
  }
  .header-container {
    display: flex;
    /* transform: translate(0%, 25%); */
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
  .main-heading {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 80px;
    line-height: 99px;
    text-align: center;
    color: #ffffff;
    max-width: 1000px; 
    margin: 0px;
    padding: 10px;
    @media (max-width:525px){
      font-size: 55px;
      line-height: 55px;
    }
  }
  .paragraph {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 27px;
    /* text-align: center; */
    color: #ffffff;
    max-width: 800px;
    /* height: 81px; */
    @media (max-width:525px){
      padding: 0 20px;
    font-size: 16px;
    }
  }
  .header-button {
    width: 209px;
    height: 63px;
    background: #d39add;
    border-radius: 30px;
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    margin-top: 20px;
    cursor: pointer;
    border: none;
  }
  .games-heading {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 62px;
    text-align: center;
    background: linear-gradient(273.03deg, #86aee0 4.06%, #d299dc 91.71%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  .images-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* place-items: center; */
    /* flex-direction: row; */
    gap: 30px;
    padding: 60px 100px;
    @media (max-width:1490px) {
      padding:60px 50px;
      gap:10px;
    }
    
    @media (max-width:1348px) {
      grid-template-columns: 1fr;
    }
    @media (max-width:768px) {
      padding:60px 10px;
    }
  }
  .raffles {
    background: url(${Raffles});
    background-repeat: no-repeat;
    width: 100%;
    height: 255px;
    border: 50px;
    background-size: cover;
    &-data {
      max-width: 266px;
      min-height: 103px;
      margin-left: auto;
      padding-top: 50px;
      margin-right: 25px;
      h6 {
        font-family: 'Righteous';
        font-style: normal;
        font-weight: 400;
        font-size: 34px;
        line-height: 42px;
        text-align: left;
        color: #d39add;
        margin: 0px;
      }
      p {
        font-family: 'Righteous';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        color: #ffffff;
        margin: 0px;
        width: 100%;
      }
    }
  }
  .auctions {
    background: url(${Auctions});
    background-repeat: no-repeat;
    width: 100%;
    height: 255px;
    border: 50px;
    background-size: cover;
  }
  .mask-group {
    background: url(${MaskBackground});
    background-repeat: no-repeat;
    width: 100%;
    margin-top: 262px;
    background-size: cover;
    background-position: center;
    @media (max-width:1024px){
      background-size: cover;
      }
    /* background-size: cover; */
    /* min-height: 441px; */
    &-data {
      display: flex;
      /* flex-wrap: wrap; */
      flex-direction: row;
      width: 100%;
      @media (max-width:1024px){
        flex-wrap: wrap;
      }
    }

    &-image {
      width: 50%;
      /* min-height: 573px; */
      /* transform: translate(-5%, -23%); */
      margin-top: -12%;
      @media (max-width: 991px) {
        max-width: 500px;
        /* height: 450px; */
        margin-top: 0%;
      }
      @media (max-width: 700px) {
        max-width: 400px;
        /* height: 450px; */
      }
      @media (max-width: 500px) {
        width: 250px;
        /* height: 450px; */
      }
    }
  }
  .mask-data {
    max-width: 45%;
    /* min-height: 292px; */
   
    display: flex;
    gap: 30px;
    flex-direction: column;
    justify-content: center;
    /* text-align: center; */
    @media (max-width:1024px) {
      max-width: 100%;
      text-align: center;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    &-heading {
      font-family: 'Righteous';
      font-style: normal;
      font-weight: 400;
      font-size: 50px;
      line-height: 62px;
      background: linear-gradient(273.03deg, #86aee0 4.06%, #d299dc 91.71%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    &-paragraph {
      font-family: 'Righteous';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 27px;
      color: #ffffff;
    }
    &-icons {
      display: flex;
      flex-direction: row;
      gap: 30px;
      img {
        border: 4px solid #d39add;
        border-radius: 50%;
        padding: 3px;
        width: 54px;
        height: 54px;
      }
    }

  }
  .mask-group-data {
    display: flex;
    flex-direction: row;
    gap: 107px;
  }
  .faqs {
    margin-top: 105px;
    &-heading {
      font-family: 'Righteous';
      font-style: normal;
      font-weight: 400;
      font-size: 50px;
      line-height: 62px;
      background: linear-gradient(273.03deg, #86aee0 4.06%, #d299dc 91.71%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-align: center;
    }
    &-container {
      padding: 80px 184px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      @media (max-width: 991px) {
        padding: 60px 100px;
      }
      @media (max-width: 768px) {
        padding: 60px 50px;
      }
      @media (max-width: 500px) {
        padding: 60px 10px;
      }
    }
  }
  .question {
    font-family: 'Righteous';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 30px;
    color: #d39add;
  }
`;

export default Style;
