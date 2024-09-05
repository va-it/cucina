let express = require('express');
let router = express.Router();
let constants = require('./constants');

router.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', `http://${constants.localHost}:${constants.frontendPort}`);
    next();
})

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

module.exports = router;