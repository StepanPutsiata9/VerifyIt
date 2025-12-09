import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
export const InActiveHistory = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G fill="#FF3737" clipPath="url(#a)">
      <Path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Z" />
      <Path d="M12 6a1 1 0 0 0-1 1v4.325l-3.371 2.112a1.002 1.002 0 1 0 1.062 1.7l3.84-2.4a1 1 0 0 0 .469-.858V7a1 1 0 0 0-1-1Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
