
import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, ScrollView} from "react-native"
import {getMovieByIdApi} from "../api/movies"
import {map} from "lodash"
import {Rating} from "react-native-ratings"
import {BASE_PATH_IMG} from "../utils/constants"
import ModalVideo from "../components/ModalVideo";
import {IconButton, Text, Title} from "react-native-paper"
import usePreferences from "../hooks/usePreferences";
import starDark from "../assets/png/starDark.png"
import starLight from "../assets/png/starLight.png"


export default function Movie(props){
    const {route} = props
    const {id} = route.params
    const [movie, setMovie] = useState(null)
    const [showVideo, setShowVideo] = useState(false)


    useEffect(() => {
        getMovieByIdApi(id).then((response)=>{
            setMovie(response)
        })
    }, [])
    if (!movie) return null
    return(
        <>
        <ScrollView showsVerticalScrollIndicator={false}>
                <MovieImage poster_path={movie.poster_path}/>
                <MovieTrailer setShowVideo = {setShowVideo}/>
                <MovieTitle movie={movie}/>
                <MovieRating voteAverage={movie.vote_average} voteCount={movie.vote_count}/>
                <Text style={styles.overview}>{movie.overview}</Text>
                <Text style={[styles.overview, {marginBottom:40}]}>Fecha de lanzamiento: {movie.release_date}</Text>
        </ScrollView>
        <ModalVideo show={showVideo} setShow = {setShowVideo} idMovie={id}></ModalVideo>
        
        </>
    )
}




function MovieImage(props){
    const {poster_path} = props

    return(
        <View style={styles.viewPoster}>
            <Image style={styles.poster} source={{uri:`${BASE_PATH_IMG}/w500${poster_path}`}}/>
        </View>
    )
}

function MovieTrailer(props){
    const {setShowVideo} = props;

    return(
        <View style={styles.viewPlay}>
            <IconButton
            icon="play"
            size={30}
            style={styles.play}
            iconColor={"#000"}
            onPress={()=>setShowVideo(true)}
            />
        </View>
    )
}

function MovieTitle(props){
    const {movie} = props;

    return(
        <View style={styles.viewInfo}>
            <Title> {movie.title} </Title>
            <View style={styles.viewGenres}>
                {map(movie.genres, (genre)=>(
                    <Text key={genre.id} style={styles.genre}>{genre.name}</Text>
                ))}
            </View>
        </View>
    )

}

function MovieRating(props){
    const {voteCount, voteAverage} = props;
    const media = voteAverage/2;
    const {theme, toggleTheme} = usePreferences();

    return(
        <View style={styles.viewRating}>
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
            <Text style={{fontSize:17, marginRight: 5}}>{media.toFixed(2)}</Text>
            <Text style = {{fontSize:12, color: "#8697a5"}}>{voteCount} votos</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    viewPoster:{
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 10,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    poster:{
        width: "100%",
        height: 500,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    viewPlay:{
        justifyContent: "flex-end",
        alignItems:"flex-end"
    },
    play:{
        backgroundColor: "#fff",
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 100
    },
    viewInfo:{
        marginHorizontal:30,
    },
    viewGenres:{
        flexDirection:"row"
    },
    genre:{
        marginRight: 12,
        color: "#8697a5"
    },
    viewRating:{
    marginHorizontal: 30,
    marginTop:10,
    flexDirection:"row",
    alignItems: "center"
    },
    overview:{
        marginHorizontal: 30,
        marginTop: 20,
        textAlign: "justify",
        color: "#8697a5",
    }
})