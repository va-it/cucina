let express = require('express');
let router = express.Router();
let constants = require('./constants');
let recipes = [];

router.use(express.json());

router.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', `http://${constants.localHost}:${constants.frontendPort}`);
    response.setHeader('Access-Control-Allow-Headers', `content-type`);
    next();
});

router.get('', function (request, response) {
    response.send('API');
});

router.get('/recipes', function (request, response) {
    response.send({
        "ok": true,
        "message": 'Recipes retrieved',
        "body": recipes
    });
});

router.post('/recipes', function (request, response) {
    if (request.body) {
        let recipe = {
            "id": recipes.length + 1,
            "name": request.body['name'],
            "instructions": request.body['instructions'],
            "ingredients": request.body['ingredients']
        }
        recipes.push(recipe);
        response.send({
            "ok": true,
            "message": "Recipe created",
            "body": recipe
        });
    }
});

module.exports = router;