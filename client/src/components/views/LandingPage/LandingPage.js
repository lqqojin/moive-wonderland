import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { FaCode } from 'react-icons/fa';
import MainImage from "./Sections/MainImage";

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
            .then(() =>{
                console.log(mainMovieImage)
            })
    }, [])

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
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button> Load More </button>
            </div>
        </div>
    )
}

export default LandingPage
