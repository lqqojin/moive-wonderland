import React from 'react';
import { Col } from 'antd';

const GridCards = (props) => {
    console.log(props);
    const { movieId, image, movieName } = props
    return (
        <Col lg={6} md={3} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/movie/${movieId}`}>
                    <img style={{ width: '100%', height: '320px'}} src={image} alt={movieName} />
                </a>

            </div>
        </Col>
    )
}
export default GridCards;
