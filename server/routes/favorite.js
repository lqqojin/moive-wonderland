const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

router.post('/favoriteNumber', (req, res) => {
    const { movieId } = req.body;
    // mongoDB 에서 favorite 숫자 가져오기
    Favorite.find({ movieId })
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            // 그 다음에 프론트에 다시 숫자 정보 보내주기
            return res.status(200).json({
                success: true,
                favoriteNumber: info.length,
            })
        })
});

router.post('/favorited', (req, res) => {
    const { movieId, userFrom } = req.body;
    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를  DB에서 가져오기
    console.log(req.body);
    Favorite.find({ movieId, userFrom })
        .exec((err, info) => {
            if(err) return res.status(400).send(err);
            let result = false;
            if(info.length !== 0 ) result = true;
            console.log('/favorited > info=', info);
            return res.status(200).json({
                success: true,
                favorited: result
            })
        })
})

router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);
    console.log(req.body);
    favorite.save((error, doc) => {
        if (error) return res.status(400).send(error);
        return res.status(200).json({ success: true, result: doc })
    });
})

router.post('/removeFromFavorite', (req, res) => {
    const { movieId, userFrom } = req.body;
    console.log(req.body);
    Favorite.findOneAndDelete({ movieId, userFrom},error => {
        if (error) return res.status(400).send(error);
        return res.status(200).json({ success: true })
    });
})

module.exports = router;

