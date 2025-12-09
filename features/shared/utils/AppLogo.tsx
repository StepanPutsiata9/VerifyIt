import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
export const AppLogo = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" {...props}>
    <G
      stroke="#FF2424"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      clipPath="url(#a)"
    >
      <Path d="M20.571 10.286h-6.857a3.429 3.429 0 0 0-3.428 3.428v6.857A3.429 3.429 0 0 0 13.714 24h6.857A3.429 3.429 0 0 0 24 20.57v-6.857a3.429 3.429 0 0 0-3.429-3.428ZM10.286 1.714H5.143a3.429 3.429 0 0 0-3.429 3.429v5.143M37.714 1.714h5.143a3.428 3.428 0 0 1 3.429 3.429v5.143M10.286 46.286H5.143a3.429 3.429 0 0 1-3.429-3.429v-5.143M37.714 46.286h5.143a3.429 3.429 0 0 0 3.429-3.429v-5.143M10.286 32.571v5.143h5.143M24 37.714v-5.143h-5.143M37.714 15.428h-5.143v-5.142M37.714 27.428v-5.142h-5.143M32.571 32.571v5.143h5.143" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h48v48H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
