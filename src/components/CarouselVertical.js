import React, {useState, useEffect} from "react";
import {
        StyleSheet, 
        View, 
        Image, 
        Dimensions, 
        TouchableWithoutFeedback} from "react-native"
import {Text, Title} from "react-native-paper"
import { shadow } from "react-native-paper";
import Carousel from "react-native-snap-carousel"
import {BASE_PATH_IMG} from "../utils/constants"
import {getGenreMovieApi} from "../api/movies"
import {map, size} from "lodash"

export default function CarouselVertical(props){
    const {width} = Dimensions.get("window") 
    const ITEM_WIDTH = Math.round(width * 0.7)

    const {data, navigation} = props;
    return(
        <Carousel
        layout={"default"}
        data= {data}
        renderItem = {(pelicula) =><RenderItem data={pelicula} navigation = {navigation}/>}
        sliderWidth = {width}
        itemWidth={ITEM_WIDTH}
        />
    )
}

export function RenderItem(props){
    const {data, navigation} = props;
    const {id, title,poster_path, genre_ids} = data.item;
    const [genres, setGenres] = useState(null)
    const img_url = `${BASE_PATH_IMG}/w500${poster_path}`

    useEffect(() => {
        getGenreMovieApi(genre_ids).then((response)=>{
            setGenres(response)
        })
    }, [])

    const onNavigation = ()=>{
        navigation.navigate('movie', {id})
    }

    return(
        <TouchableWithoutFeedback onPress={onNavigation}>
            <View style ={styles.card}>
                <Image style={styles.image} source={{uri: img_url}}></Image>
                <Text style={styles.newTitle}>{`${title}`}</Text>
                <View style =  {styles.genres}>
                {genres && (
                    map(genres, (genre, index)=>(
                        <Text key={index} style={styles.genre}>
                            {genre}
                            {index !== size(genres)-1 && ', '}
                        </Text>
                    ))
                ) }    
                </View> 
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    card:{
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius:10,
        display: "flex",
        alignItems:"center"
    },
    image:{
        width:"90%",
        height: 380,
        borderRadius:20,
    },
    newTitle:{
        fontSize: 17,
        textAlign: "center",
        marginTop: 10
    },
    genres:{
        flexDirection: "row",
        marginHorizontal: 10,
        justifyContent: "center"
    },
    genre:{
        fontSize:12,
        color:"#a5accb",
    }
})