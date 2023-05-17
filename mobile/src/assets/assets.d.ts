/*servira para a tipagem do arquivo para permitir importacao como do png*/

declare module '*.png'

/*Para uso com o typescript e o svg transformer, precisamos incluir estas linhas:*/

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}