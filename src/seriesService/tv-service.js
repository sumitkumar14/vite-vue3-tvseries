import axios from "axios";
const headers = { "Content-Type": "application/json" };
class Service{
    seriesList(){
        return axios
        .get("https://api.tvmaze.com/shows", { headers })
       
    }
    serachList(val){
        return axios.get(`https://api.tvmaze.com/search/shows?q=${val}`, { headers })
    }
    seriesDetails(showId){
        return axios.get(`https://api.tvmaze.com/shows/${showId}`, { headers });
    }
    seriesCastDetails(showId){
        return axios.get(`https://api.tvmaze.com/shows/${showId}/cast`, { headers });
    }
    seriesEpisodesDetails(showId){
        return axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`, { headers });
    }
 }
export default Service;