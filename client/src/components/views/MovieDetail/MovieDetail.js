import React, {useEffect, useState} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import {Row} from "antd";
import MainImage from "../commons/Sections/MainImage";
import MovieInfo from "../commons/Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from '../commons/Sections/Favorite';


const MovieDetail = (props) => {
    let movieId = props.match.params.movieId
    const [movie, setMovie] = useState([]);
    const [casts, setCasts] = useState([]);
    const [actorToggle, setActorTogger] = useState(true);
    useEffect(() => {
        console.log(props.match);
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        // 영화 정보 가져오기
        fetch(endPointInfo)
            .then(response => response.json())
            .then(response => {
                console.log('%c[fetch] response for info > result=', 'color:skyblue',response);
                setMovie(response);
            })
        // 출연진 정보 가져오기
        fetch(endPointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('%c[fetch] response for casts > result=', 'color:skyblue',response);
                setCasts(response.cast);
            })
    }, []);

    const toggleActorView = () => {
        setActorTogger(!actorToggle);
    }

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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>
                {/*Movie Info*/}
                <MovieInfo
                    movie={movie}
                />
                <br />
                {/*Actors Grid*/}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>
                {actorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            casts && casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards
                                        image={
                                            cast.profile_path
                                                ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                                                : null
                                        }
                                        characterName={cast.name}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail;
