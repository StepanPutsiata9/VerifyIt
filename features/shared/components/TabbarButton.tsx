import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import React, { ReactNode, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ActiveHistory, ActiveHome, InActiveHistory, InActiveHome } from '../utils';
interface IProps {
  href?: string;
  accessibilityState?: any;
  accessibilityLabel?: string;
  testID?: string;
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  label: string | ReactNode;
  IconComponent?: (props: { isFocused: boolean }) => ReactNode;
}
type TabIcons = {
  [key: string]: (props: { isFocused: boolean }) => ReactNode;
};

function TabbarButton({
  href,
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
  isFocused,
  routeName,
}: IProps) {
  const { buildHref } = useLinkBuilder();
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [scale, isFocused]);
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    return {
      transform: [{ scale: scaleValue }],
    };
  });
  const icons: TabIcons = {
    home: (props: { isFocused: boolean }) => (props.isFocused ? <ActiveHome /> : <InActiveHome />),
    history: (props: { isFocused: boolean }) =>
      props.isFocused ? <ActiveHistory /> : <InActiveHistory />,
  };
  const IconComponent = icons[routeName];
  return (
    <PlatformPressable
      href={href || buildHref(routeName)}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}
      hitSlop={{ top: 15, bottom: 15, left: 35, right: 35 }}
    >
      <Animated.View style={[animatedIconStyle]}>
        {IconComponent
          ? IconComponent({
              isFocused: isFocused,
            })
          : null}
      </Animated.View>
    </PlatformPressable>
  );
}

export default TabbarButton;
const styles = StyleSheet.create({
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
});
