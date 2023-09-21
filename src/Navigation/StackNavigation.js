import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "../screens/Home";
import Movie from "../screens/Movie";
import News from "../screens/News";
import Popular from "../screens/Popular";
import Search from "../screens/Search";
import { Button, IconButton} from "react-native-paper";
import Searchbar from "react-native-paper";
const Stack = createNativeStackNavigator();

export default function StackNavigation(props){
 const {navigation} = props;   
    const leftButton = () =>{
        return(
            <IconButton
            icon="menu"
            onPress={() => navigation.openDrawer()}
            />
        )
    }

    const rightButton = () =>{
        return(
            <IconButton
            icon="magnify"
            onPress={() => navigation.navigate("search")}
            />
        )
    }



    return(
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} 
            options={{title:"TheMovieApp", headerLeft: ()=>leftButton(), headerRight: ()=>rightButton()}}/>
            
            <Stack.Screen name="news" component={News} 
            options={{title:"Estrenos", headerLeft: ()=>leftButton(), headerRight: ()=>rightButton()}}/>

            <Stack.Screen name="movie" component={Movie} 
            options={{title:"", headerRight: ()=>rightButton(), headerTransparent: true}}/>

            <Stack.Screen name="popular" component={Popular} 
            options={{title:"Populares", headerLeft: ()=>leftButton(), headerRight: ()=>rightButton()}}/>

            <Stack.Screen 
            name="search" 
            component={Search} 
            options={{title:"buscar", headerTransparent: true,
            headerShown: false
            }}/>
        </Stack.Navigator>
    )
}
