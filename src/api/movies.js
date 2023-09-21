import {API_HOST, lang, options} from "../utils/constants"



export function getNewsMoviesApi(page = 1){
    const url = `${API_HOST}movie/now_playing?language=${lang}&page=${page}`

    return fetch(url, options)
    .then(res => res.json())
    .then(json => {return json})
    .catch(err => console.error('error:' + err));
}

export function getGenreMovieApi(idGenres){
    const url = `${API_HOST}genre/movie/list?language=${lang}`

    return fetch(url, options)
    .then(res => {
        return res.json()
    })
    .then(json=>{

        const arrayGenres = [];
        idGenres.forEach(id => {
            json.genres.forEach((item)=>{
                if(item.id == id){
                    arrayGenres.push(item.name)
                }
            })
        });
        return arrayGenres
    })
    .catch(err => console.error('error'+err))
}


export function getAllGenresApi(){
    const url = `${API_HOST}genre/movie/list?language=${lang}`

    return fetch(url, options)
    .then((res)=>{return res.json()})
    .then((json => {
        return json
    })).catch(err => console.error('error'+err))
}

export function getGenreMoviesApi(idGenres){
    const url = `${API_HOST}discover/movie?with_genres=${idGenres}&language=${lang}`

    return fetch(url, options)
    .then((res)=>{return res.json()})
    .then((json => {
        return json
    })).catch(err => console.error('error'+err))
}

export function getMovieByIdApi(idMovie){
    const url = `${API_HOST}/movie/${idMovie}?language=${lang}`

    return fetch(url, options)
    .then((res)=>{return res.json()})
    .then((json => {
        return json
    })).catch(err => console.error('error'+err))
}

export function getVideoMovieApi(idMovie){
    const url = `${API_HOST}/movie/${idMovie}/videos?language=${lang}`

    return fetch(url, options)
    .then((res)=>{return res.json()})
    .then((json => {
        return json
    })).catch(err => console.error('error'+err))
}

export function getPopularMoviesApi(page = 1){
    const url = `${API_HOST}/movie/popular?language=${lang}&page=${page}`

    return fetch(url, options)
    .then((res)=>{return res.json()})
    .then((json => {
        return json
    })).catch(err => console.error('error'+err))
}

export function searchMoviesApi(search) {
    const url = `${API_HOST}/search/movie?query=${search}&language=${lang}`
    
    return fetch(url, options)
    .then((res)=>{return res.json()})
    .then((json => {
        return json
    })).catch(err => console.error('error'+err))
}