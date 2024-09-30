import React from 'react';
import { Image } from 'react-native';
import Logo from '../img/fitlife.png'

const Logotipo = () => {
  
  return (
    <Image
      source={Logo}
      style={{ width: 450, height: 200 }}
    />
  );
};

export default Logotipo;