import React, {useMemo, useState} from 'react';
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
  NavigationContainer,
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
} from '@react-navigation/native';
import {
  PaperProvider,
  MD2DarkTheme as DarkThemePaper,
  MD2LightTheme as DefaultThemePaper,
} from 'react-native-paper';
import Navigation from './src/Navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';

export default function App() {
  const [theme, setTheme] = useState("dark")
  //theme paper
  DefaultThemePaper.colors.primary="#003c84"
  DarkThemePaper.colors.primary="#bbdafb"
  DarkThemePaper.colors.accent = "#bbdafb"

  //theme navigation
  DarkThemeNavigation.colors.background="#082032"
  DarkThemeNavigation.colors.card="#052c53"


  const toggleTheme=()=>{
    setTheme(theme ==="dark" ? "light" : "dark")
  } 

  const preference= useMemo(
    () =>({
      toggleTheme,
      theme,
    }),
    [theme]
  )

  return (
    <PreferencesContext.Provider value={preference}>
    <PaperProvider theme={theme === "dark" ?  DarkThemePaper : DefaultThemePaper }>
      <NavigationContainer theme={theme === "dark" ? DarkThemeNavigation : DefaultThemeNavigation}>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
    </PreferencesContext.Provider>
  );
}
