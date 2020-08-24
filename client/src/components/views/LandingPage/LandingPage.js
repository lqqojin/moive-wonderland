import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { FaCode } from 'react-icons/fa';
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";

function LandingPage() {
    const [movies, setMovies] = useState([])
    const [mainMovieImage, setMainMovieImage] = useState(null);
    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endPoint)
            .then(response => response.json())
            .then(response => {
                setMovies([response.results]);
                console.log(response.results[0])
                setMainMovieImage(response.results[0]);
                console.log(response)
            })
    }, [])
    useEffect(() => {
        console.log('movies', movies);
    }, [movies, mainMovieImage])
    return (
        <div style={{ width: '100%', margin: '0'}}>
            {/*Main Image*/}
            {
                mainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
                    title={mainMovieImage.original_title}
                    text={mainMovieImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr />
                {/*Movie Grid Cards*/}
                <Row>
                    {
                        movies && movies.length > 0 && movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={
                                        movie.poster_path
                                        ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                                        : null
                                    }
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        ))
                    }

                </Row>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button> Load More </button>
            </div>
        </div>
    )
}

export default LandingPage
