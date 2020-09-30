import React from 'react';
import SACTLogoImg from '../assets/img/SACTLogo.png';

export const SactLogo: React.FC<React.ImgHTMLAttributes<
  HTMLImageElement
>> = props => {
  return <img src={SACTLogoImg} alt="Brand logo" {...props} />;
};
