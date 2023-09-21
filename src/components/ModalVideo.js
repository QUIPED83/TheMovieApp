import React, {useState, useEffect} from "react";
import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import {Modal, IconButton, Title} from "react-native-paper"
import { getVideoMovieApi } from "../api/movies";


export default function ModalVideo(props){
    const {show, setShow, idMovie} = props
    const [video, setVideo] = useState(null)
    
    useEffect(() => {
        getVideoMovieApi(idMovie).then((response)=>{
            for(let video of response.results){
                if(video.site == "YouTube"){
                    setVideo(video.key)
                    break
                }
            }
        })
    }, [])

    return(
        <Modal visible={show} contentContainerStyle={styles.modal}>
            <WebView style={{width:500}} source={{uri: `https://www.youtube.com/embed/${video}?controls=0`}}/>
            <Title>Hola modal</Title>
            <IconButton
            icon="close"
            onPress={()=>setShow(false)}
            style={styles.close}
            />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor: "#000",
        height: "120%",
        alignItems: "center"
    },
    close:{
        backgroundColor:"#1ea1f2",
        width: 50,
        height: 50,
        borderRadius: 100,
        position:"absolute",
        bottom: 100
    },
    video:{
        alignSelf: "stretch",
        height: 300,
    }
})