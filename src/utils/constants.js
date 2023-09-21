const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOTY5ZmNmMzQ2YTk1M2I1ZDJkNmEwMzE3NDZlMzZjMSIsInN1YiI6IjY0ODEyZDk0ZTM3NWMwMDBmZjQ2Y2YzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.93BPhsjQK8pRlM8PBgKswgazkLEnsE2nQEJwx7qrBDs'

export const API_HOST = "https://api.themoviedb.org/3/"

export const lang = "es-MX"

export const BASE_PATH_IMG =  "https://image.tmdb.org/t/p" 

export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    }
  };