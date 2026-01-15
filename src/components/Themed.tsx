// /**
//  * Learn more about Light and Dark modes:
//  * https://docs.expo.io/guides/color-schemes/
//  */

// import { Text as DefaultText, View as DefaultView } from 'react-native';

<<<<<<< HEAD
// import {COLORS} from '@/constants/colors';
// import { useColorScheme } from './useColorScheme';
=======
import { COLORS } from '@/constants/colors';
import { useColorScheme } from './useColorScheme';
>>>>>>> 7584716faedbd1536bc733eda859f7476c9c9f00

// type ThemeProps = {
//   lightColor?: string;
//   darkColor?: string;
// };

// export type TextProps = ThemeProps & DefaultText['props'];
// export type ViewProps = ThemeProps & DefaultView['props'];

<<<<<<< HEAD
// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof COLORS.light & keyof typeof COLORS.dark
// ) {
//   const theme = useColorScheme() ?? 'light';
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return COLORS[theme][colorName];
//   }
// }
=======
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof COLORS
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return COLORS[colorName];
  }
}
>>>>>>> 7584716faedbd1536bc733eda859f7476c9c9f00

// export function Text(props: TextProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

//   return <DefaultText style={[{ color }, style]} {...otherProps} />;
// }

// export function View(props: ViewProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

//   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
// }
