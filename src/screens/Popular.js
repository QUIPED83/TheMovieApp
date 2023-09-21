import React, {useState, useEffect} from "react";
import {View, StyleSheet, ScrollView, Image, TouchableWithoutFeedback, ActivityIndicator} from "react-native"
import { Button, Text, Title } from "react-native-paper";
import {map} from "lodash"
import { getPopularMoviesApi} from "../api/movies"
import {BASE_PATH_IMG} from "../utils/constants"
import defaultImg from "../assets/png/default-imgage.png"
import { Rating } from "react-native-ratings";
import starDark from "../assets/png/starDark.png"
import starLight from "../assets/png/starLight.png"
import usePreferences from "../hooks/usePreferences";


export default function Popular(props){
    const [movies, setMovies] = useState(null)
    const {navigation} = props;
    const {theme, toggleTheme} = usePreferences();
    const [showBtnMore, setShowBtnMore] = useState(false)
    const [page, setPage] = useState(1)
    useEffect(() => {
        getPopularMoviesApi(page).then(response =>{
            const totalPages = response.total_pages;
            if(page < totalPages){
                if(!movies){
                    setMovies(response.results)
                    setShowBtnMore(true)
                }else{
                    setMovies([...movies, ...response.results])
                    setShowBtnMore(true)
                }
            }else{
                setShowBtnMore(false)
            }
        })
    }, [page])

    return(
        <ScrollView>
            { movies ? 
            map(movies, (movie, index)=>(
                <Movie key={index} movie={movie} theme={theme} navigation={navigation}/>
            )):
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#839EC4" />
            </View>
            }{
            showBtnMore && (
                <Button
                mode="contained"
                contentStyle={styles.loadMoreContainer}
                style={styles.loadMore}
                labelStyle={{color: theme === "dark" ? "#fff" : "#000"}}
                onPress={()=>{setPage(page+1)}}
                >Cargar más</Button>
            )}
        </ScrollView>
    )
}

function Movie(props){

    const {movie, theme, navigation} = props;
    const {id, poster_path, title, release_date, vote_count, vote_average} = movie;
    const goMovie = () =>{
        navigation.navigate("movie", {id})
    }

    return(
        <TouchableWithoutFeedback onPress={goMovie}>
        <View style={styles.movie}>
            <View style={styles.left}>
                <Image
                style={styles.Image}
                source={
                poster_path ?
                {uri: `${BASE_PATH_IMG}/w500/${poster_path}`} :
                defaultImg
                }
                />  
            </View>
            <View>
                <Title>{title}</Title>
                <Text>{release_date}</Text>
                <MovieRating vote_count={vote_count} vote_average={vote_average} theme = {theme}> </MovieRating>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

function MovieRating(props){
    const {theme, vote_average, vote_count} = props;
    const media = vote_average/2;
    return(
        <View style= {styles.viewRating}>
        <Rating 
            type="custom"
            ratingImage= {theme === "dark" ? starDark : starLight}
            ratingColor="#ffc205"
            ratingBackgroundColor= {theme === "dark" ? "#003c84": "#fff"}
            startingValue={media}
            imageSize={20}
            style={{marginRight:15}}
            readonly={true}
        />
        <Text style={{fontSize: 12, color:"#8697a5", marginTop: 5}}>
            {vote_count} votos
        </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    movie:{
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    left:{
        marginRight: 20,
        
    },
    Image:{
        width: 100,
        height: 150,
    },
    viewRating:{
        alignItems:"flex-start",
        justifyContent: "flex-start",
        marginTop: 10
    },
    loadMoreContainer:{
        paddingTop: 10,
        paddingBottom: 30,

    },
    loadMore:{
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 250
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})
