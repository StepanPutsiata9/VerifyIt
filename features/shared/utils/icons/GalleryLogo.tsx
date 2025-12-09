import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
export const GalleryLogo = (props: SvgProps) => (
  <Svg width={60} height={60} fill="none" {...props}>
    <Path
      stroke="#FF3737"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.5}
      d="M46.72 56.787 22.714 34.3a2.305 2.305 0 0 0-2.949 0L2.21 46.926M42.255 33.768a6.429 6.429 0 1 1 0-12.857 6.429 6.429 0 0 1 0 12.857Z"
    />
    <Path
      stroke="#FF3737"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.5}
      d="M2.143 52.5v-45a4.286 4.286 0 0 1 4.286-4.285h15.814a4.286 4.286 0 0 1 4.286 3.257l1.328 5.314h25.714a4.285 4.285 0 0 1 4.286 4.286v36.429a4.286 4.286 0 0 1-4.286 4.286H6.43A4.286 4.286 0 0 1 2.143 52.5Z"
    />
  </Svg>
);
