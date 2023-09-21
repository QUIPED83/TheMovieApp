import React, {useState, useEffect} from "react";
import {StyleSheet, ScrollView,View} from "react-native"
import { Text } from "react-native-paper";
import { getNewsMoviesApi, getAllGenresApi, getGenreMoviesApi } from "../api/movies";
import {Title} from "react-native-paper"
import {map} from "lodash"
import CarouselVertical from "../components/CarouselVertical";
import CarouselMulti from "../components/CarouselMulti";

export default function Home(props){
    const {navigation} = props
    const [newMovies, setNewMovies] = useState(null)
    const [genreList, setGenreList] = useState(null)
    const [genreSelected, setGenreSelected] = useState()
    const [genreMovies, setGenreMovies] = useState()

    const onChangueGenre = (newGenreId) =>{
        setGenreSelected(newGenreId)
    }

    useEffect(() => {
        getNewsMoviesApi().then(response =>{
        setNewMovies(response.results)
    })
    }, [])  

    useEffect(() => {
        getAllGenresApi().then((response)=>{
        setGenreList(response.genres)
    })
    }, [])

    useEffect(()=>{
        getGenreMoviesApi(genreSelected).then((response) =>{
        setGenreMovies(response.results)
        
    })
    },[genreSelected])

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {newMovies &&(
                <View style={styles.news}>
                    <Title style={styles.newsTitle}>
                    Nuevas Peliculas
                    </Title>
                    <CarouselVertical data={newMovies} navigation={navigation}/>
                </View>
            ) }
            <View style = {styles.genres}>
                <Title style={styles.genresTitle}>Peliculas por genero</Title>
                <ScrollView horizontal showsHorizontalScrollIndicator ={false} style={styles.genreList}>
                {genreList && (
                    map(genreList, (genre, index)=>(
                        <Text 
                        key={genre.id} 
                        style={[styles.genre, {
                            color: genre.id !== genreSelected ? "#8298a5" : "#fff", 
                            backgroundColor: genre.id !== genreSelected ? "transparent" : "#28364f",
                            borderRadius: 4, 
                            padding: 4}]}
                        onPress={()=>{ onChangueGenre(genre.id)}}
                        >
                            {genre.name}
                        </Text>
                    ))
                    )
                }
                </ScrollView>
                {genreMovies && (
                    <CarouselMulti
                    data = {genreMovies}
                    navigation = {navigation}
                    />
                )}
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news:{
        marginVertical: 10,
    },
    newsTitle:{
        marginBottom: 15,
        marginHorizontal:20,
        fontWeight: "bold",
        fontSize:22
    },
    genres:{
        marginTop: 20,
        marginBottom: 50,

    },
    genresTitle:{
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 22,
    },
    genreList:{
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 10,
    },
    genre:{
        marginRight: 20,
        fontSize: 16,
    }
})