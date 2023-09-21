import React, {useState, useEffect} from "react";
import {StyleSheet, ScrollView, View, SafeAreaView, Image, TouchableWithoutFeedback, Dimensions} from "react-native"
import {Searchbar, Text} from "react-native-paper"
import {searchMoviesApi} from "../api/movies"
import { SearchBar } from "react-native-screens";
import usePreferences from "../hooks/usePreferences";
import {size, map} from "lodash"
import { BASE_PATH_IMG } from "../utils/constants";
const {width} = Dimensions.get("window")

export default function Search(props){
    const [movies, setMovies] = useState(null)
    const {navigation} = props
    const {theme} = usePreferences()
    const [search, setSearch] = useState('')


    useEffect(() => {
        if(size(search) > 2){
        searchMoviesApi(search).then((response)=>{
            setMovies(response.results)
        })}
    }, [search])

    const back = () => {
        navigation.goBack();
    }

    return(
        <SafeAreaView>
            <Searchbar
            icon="arrow-left"
            onIconPress={()=>{back()}}
            placeholder="Busca tu pelicula"
            style= {[styles.input,{ backgroundColor: theme === "dark" ? "#15212b" : "#ffffff"}]}
            onChangeText={(e)=> {setSearch(e)}}
            />

            <ScrollView>
                <View style={styles.container}>
                    {
                        map(movies, (movie, index) => (
                            <Movie key={index} movie={movie} navigation={navigation}/>
                        ))
                    }
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}


function Movie(props){
    const {movie, navigation} = props;
    const {poster_path, title, id} = movie;
    const goMovie =()=>{
        navigation.navigate("movie", {id})
    }

    const url = `${BASE_PATH_IMG}/w500${poster_path}`;

    return(
        <TouchableWithoutFeedback onPress={()=>{goMovie()}}>
            <View style={styles.movie}>
                { poster_path ? (<Image style={styles.image} source={{uri: url}}/>)
                :
                <Text>{title}</Text>

            }
                
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    input:{
        marginTop: 4 
    },
    container:{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    movie:{
        width: width/2,
        height: 300,
        justifyContent:"center",
        alignItems: "center"
    },
    image:{
        width: "100%",
        height: "100%"
    }
})