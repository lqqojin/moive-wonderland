import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';
const Favorite = (props) => {
    const { movieId, movieInfo, userFrom } = props;
    const { title, backdrop_path, runtime } = movieInfo;
    let variables = {
        userFrom,
        movieId,
        movieTitle: title,
        moviePost: backdrop_path,
        movieRunTime: runtime,
    }
    const [favoriteNumber, setFavoriteNumber ] = useState(0);
    const [favorited, setFavorited] = useState(false);
    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                    console.log(response.data);
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })
        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited);
                    console.log(`%c[favorited] response > data=`, 'color:skyblue', response.data);
                } else {
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })
    }, [])

    const onClicKFavorite = () => {
        console.log(variables)
        if(favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber - 1)
                        setFavorited(!favorited);
                    } else alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                })
                .catch(error => {
                    alert(`오류가 발생했습니다. \n ${error.toString()}`);
                    console.log(error);
                });
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    } else alert ('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                })
                .catch((error) => {
                    alert(`오류가 발생했습니다. \n ${error.toString()}`);
                    console.log(error);
                })
        }
    }

    return (
        <div>
            <Button onClick={onClicKFavorite}> { favorited ? 'Not Favorite' : 'Add to Favorite' } {favoriteNumber} </Button>
        </div>
    );
}

export default Favorite;
