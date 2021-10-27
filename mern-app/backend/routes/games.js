const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
    Game.find()
    .then(apps => res.json(apps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const gamePlayed = req.body.gamePlayed;
    const result = req.body.result;
    const duration = Number(req.body.duration);

    
    
    const newGame = new Game({
        username,
        gamePlayed,
        result,
        duration,
    });

    newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Game.findById(req.params.id)
        .then(game => res.json(game))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Game.findByIdAndDelete(req.params.id)
    .then(() => res.json('Game deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Game.findById(req.params.id)
        .then(game => {
            game.username = req.body.username;
            game.gamePlayed = req.body.gamePlayed;
            game.result = req.body.result;
            game.duration = Number(req.body.duration);
            
            game.save()
                .then(() => res.json('Game updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;