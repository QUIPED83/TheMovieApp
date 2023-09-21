import React, { Component, useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerContentScrollView,  DrawerItemList} from '@react-navigation/drawer'
import { Drawer, Switch, TouchableRipple, Text} from 'react-native-paper'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import usePreferences from '../hooks/usePreferences'
//en este archivo se modificará el menu lateral "drawer" como cualquier otra screen por ser componente
export default function DrawerContent(props){
    const {navigation, setScreen} = props;
    const [active, setActive] = useState("home")
    const {theme, toggleTheme} = usePreferences();
    
    const onChangueScreen = (screen) => { 
        navigation.navigate(screen)
        setActive(screen)
        setScreen(screen)
    }
    return (
    <DrawerContentScrollView>
        <Drawer.Section>
            <Drawer.Item 
            label='Inicio' //este nombre aparece en el drawer
            active= {active == "home" ? true : false} //si el estado de la screen cambia a true se pinta rosa en el menu
            onPress={() => onChangueScreen("home")}//navegamos a la screen home
            />
            <Drawer.Item 
            label='Nuevas peliculas' //este nombre aparece en el drawer
            active= {active == "news" ? true : false}
            onPress={() => onChangueScreen("news")}//navegamos a la screen news
            />  
            <Drawer.Item 
            label='Populares' //este nombre aparece en el drawer
            active= {active == "popular" ? true : false}
            onPress={() => onChangueScreen("popular")}//navegamos a la screen popular
            /> 
        </Drawer.Section>
        <Drawer.Section title='Otras opciones'>
            <TouchableRipple>
                <View style={styles.preference}>
                    <Text>Tema Oscuro</Text>
                    <Switch value={theme === "dark"} onValueChange={toggleTheme}/>
                </View>
            </TouchableRipple>
        </Drawer.Section>
    </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preference:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
