import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#00c600',
    accent: '#005500',
    gray100: '#f2f2f2',
    gray200: '#eaeaea',
    text100: '#acacac',
    text200: '#6c6c6c',
    text300: '#474747',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#00c600',
    accent: '#005500',
    gray100: '#f2f2f2',
    gray200: '#eaeaea',
    text100: '#acacac',
    text200: '#6c6c6c',
    text300: '#474747',
  },
};

export {CombinedDarkTheme, CombinedDefaultTheme};
