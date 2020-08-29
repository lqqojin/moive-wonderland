import React, {useEffect, useState} from 'react';
import { Button, Popover } from 'antd';
import './favorite.css';
import Axios from "axios";
import {IMAGE_BASE_URL} from "../../Config";
const FavoritePage = () => {
    const userFrom = localStorage.getItem('userId');
    const [favorites, setFavorites] = useState([])
    const fetchFavoredMovie = () => {
        Axios.post('api/favorite/getFavoritedMovie', { userFrom })
            .then(response => {
                if (response.data.success) {
                    console.log('%c[fetch] response > favorites=', 'color:skyblue', response.data);
                    setFavorites(response.data.favorites);
                } else alert('영화 정보를 가져오는데 실패했습니다.');
            })
    }

    useEffect(() => {
        fetchFavoredMovie();
    }, [])

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom,
        }
        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie();
                } else alert('리스트에서 지우는데 실패했습니다.')
            })
    }

    const renderCards = favorites && favorites.map((favorite, index) => {
        const content = (
            <div>
                {
                    favorite && favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : 'no Image'
                }
            </div>
        )
        return <tr key={index}>
                    <Popover content={content} title={`${favorite.movieTitle}`}>
                        <td>{favorite.movieTitle}</td>
                    </Popover>
                    <td>{favorite.movieRunTime}mins</td>
                    <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
                </tr>
        }
    )

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2> Favorite Movies </h2>
            <hr />
            <table>
                <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie RunTime</th>
                    <th>Remove from favorites</th>
                </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage;