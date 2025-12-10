import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
export const Notifications = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <G
      stroke="#FF3737"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      clipPath="url(#a)"
    >
      <Path d="M13.714 30.286h4.572M25.143 13.143a9.143 9.143 0 1 0-18.286 0v8A3.429 3.429 0 0 1 3.43 24.57H28.57a3.429 3.429 0 0 1-3.428-3.428v-8ZM1.143 12.846A13.714 13.714 0 0 1 6.857 1.714M30.857 12.846a13.712 13.712 0 0 0-5.714-11.132" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h32v32H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
