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
        "body": [
            {
                "id": 1,
                "name": "Tiramisu",
            },
            {
                "id": 2,
                "name": "Pizza",
            },
        ]
    });
});

router.post('/recipes', function (request, response) {
    console.log(request.body);
});

module.exports = router;