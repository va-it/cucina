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

    response.write(`Welcome to Cucina API \n\n`);
    response.write(`Available routes \n`);
    let routesLayers = router.stack.filter(r => r.route !== undefined);
    routesLayers.forEach(routeLayer => {
        response.write(Object.keys(routeLayer.route.methods).toString().toUpperCase());
        response.write(`        `);
        response.write(routeLayer.route.path);
        response.write(`\n`);
    });
    response.end();
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
            "servings": request.body['servings'],
            "ingredients": request.body['ingredients'],
            "instructions": request.body['instructions']
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

router.get('/recipes/:id', function (request, response) {
    let recipe = recipes.find(recipe => recipe.id === +request.params.id);
    if (recipe) {
        response.send({
            "ok": true,
            "message": 'Recipe retrieved',
            "body": recipe
        });
    } else {
        response.sendStatus(404);
    }
});

router.put('/recipes/:id', function (request, response) {
    if (request.body) {
        let recipeIndex = recipes.findIndex(recipe => recipe.id === +request.params.id);
        if (recipeIndex !== -1) {
            recipes.at(recipeIndex).name = request.body['name'];
            recipes.at(recipeIndex).servings = request.body['servings'];
            recipes.at(recipeIndex).ingredients = request.body['ingredients'];
            recipes.at(recipeIndex).instructions = request.body['instructions'];
            response.send({
                "ok": true,
                "message": "Recipe updated",
                "body": recipes.at(recipeIndex)
            });
        } else {
            response.sendStatus(404);
        }
    }
});

router.delete('/recipes/:id', function (request, response) {
    let recipeIndex = recipes.findIndex(recipe => recipe.id === +request.params.id);
    if (recipeIndex !== -1) {
        recipes.splice(recipeIndex, 1);
        response.send({
            "ok": true,
            "message": "Recipe deleted",
            "body": null
        });
    } else {
        response.sendStatus(404);
    }
});

module.exports = router;