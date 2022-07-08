import { FC } from 'react';
import Base from '../Base';
import Body from '../Body';
import Header from '../Header';

export interface ScreenProps {
  onBackNavigation?: () => void;
}

export const Screen: FC<ScreenProps> = ({ children, onBackNavigation }) => {
  return (
    <Base>
      <Body>
      <Header onBackNavigation={onBackNavigation} />
        {children}
      </Body>
    </Base>
  );
};

export default Screen;
