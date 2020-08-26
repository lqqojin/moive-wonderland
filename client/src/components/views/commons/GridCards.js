import React from 'react';
import { Col } from 'antd';

const GridCards = (props) => {
    const { movieId, image, movieName, landingPage, characterName } = props
    if(landingPage) {
        return (
            <Col lg={6} md={12} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}`}>
                        <img style={{ width: '100%', height: '320px'}} src={image} alt={movieName} />
                    </a>

                </div>
            </Col>
        )
    }
    return (
        <Col lg={6} md={12} xs={24}>
            <div style={{ position: 'relative' }}>
                {/*<a href={`/movie/${movieId}`}>*/}
                    <img style={{ width: '100%', height: '320px'}} src={image} alt={characterName} />
                {/*</a>*/}
            </div>
        </Col>
    )
}
export default GridCards;
