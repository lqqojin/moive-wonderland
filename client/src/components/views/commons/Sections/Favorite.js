import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';
const Favorite = (props) => {
    const { movieId, movieInfo, userFrom } = props;
    const { title, backdrop_path, runtime } = movieInfo;
    const [favoriteNumber, setFavoriteNumber ] = useState(0);
    const [favorited, setFavorited] = useState(false);
    useEffect(() => {
        let variables = {
            userFrom,
            movieId,
        }
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
                    console.log(response.data);
                } else {
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })
    }, [])


    return (
        <div>
            <Button> { favorited ? 'Not Favorite' : 'Add to Favorite' } {favoriteNumber} </Button>
        </div>
    );
}

export default Favorite;
