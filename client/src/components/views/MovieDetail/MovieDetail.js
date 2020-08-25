import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../commons/Sections/MainImage";
import MovieInfo from "../commons/Sections/MovieInfo";

const MovieDetail = (props) => {
    let movieId = props.match.params.movieId
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        console.log(props.match);
        console.log(movieId);
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endPointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovie(response);
            })
    }, []);

    return (
        <div>
            {/*Header*/}
            {
                movie?.backdrop_path &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
                    title={movie.original_title}
                    text={movie.overview}
                />
            }
            {/*Body*/}
            <div style={{ width: '85%', margin: '1rem auto'}}>
                {/*Movie Info*/}
                <MovieInfo
                    movie={movie}
                />
                <br />
                {/*Actors Grid*/}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button> Toggle Actor View </button>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;
