import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';
export const ActiveHome = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M23.143 11.897a1.712 1.712 0 0 0-.549-1.268L12 .857 1.406 10.63a1.714 1.714 0 0 0-.549 1.268v9.531a1.714 1.714 0 0 0 1.715 1.715h18.857a1.715 1.715 0 0 0 1.714-1.715v-9.53ZM12 23.143v-6.857" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
