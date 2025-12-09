import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
export const ScannerLogo = (props: SvgProps) => (
  <Svg width={60} height={60} fill="none" {...props}>
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.5}
      clipPath="url(#a)"
    >
      <Path d="M16.071 57.858H6.122a3.98 3.98 0 0 1-3.98-3.98V43.93M57.857 43.929v9.95a3.98 3.98 0 0 1-3.98 3.979H43.93M43.929 2.143h9.948a3.98 3.98 0 0 1 3.98 3.98v9.948M2.143 16.071V6.122a3.98 3.98 0 0 1 3.98-3.98h9.948M2.143 30h55.714" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h60v60H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
