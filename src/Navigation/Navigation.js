import React, {useState} from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"
import { ProviderProps} from "react-native-paper";
import StackNavigation from "./StackNavigation"
import DrawerContent from "./DrawerContent"; //importamos el componente del drawer (otra screen)
const Drawer = createDrawerNavigator();

export default function Navigation(){
    const [screen, setScreen] = useState("home")

    return( //drawerContent es un atributo que se puede modificar
            //le mando mi propio drawer content y los props para usar navigation
        <Drawer.Navigator initialRouteName="app" 
        drawerContent = {(props)=><DrawerContent {...props} 
        setScreen = {setScreen}
        />}>
            <Drawer.Screen name="app" component={StackNavigation} 
            options={{ headerShown: false }} //escondemos el encabezado de la app y dejamos el de los stacks
            />
        </Drawer.Navigator>
    )   
}