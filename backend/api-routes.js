let express = require('express');
let router = express.Router();
let constants = require('./constants');
let recipes = [];

router.use(express.json());

router.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', `http://${constants.localHost}:${constants.frontendPort}`);
    response.setHeader('Access-Control-Allow-Headers', `content-type`);
    response.setHeader('Access-Control-Allow-Methods', `GET,POST,PUT,DELETE`);
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

router.get('/recipes/:id', function (request, response) {
    let recipe = recipes.find(recipe => recipe.id === +request.params.id);
    response.send({
        "ok": true,
        "message": 'Recipe retrieved',
        "body": recipe
    });

});

router.post('/recipes', function (request, response) {
    if (request.body) {
        let recipe = {
            "id": recipes.length + 1,
            "name": request.body['name'],
            "servings": request.body['servings'],
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

router.delete('/recipes', function (request, response) {
    recipes = [];
    response.send({
        "ok": true,
        "message": "Recipes deleted",
        "body": null
    });
});

module.exports = router;