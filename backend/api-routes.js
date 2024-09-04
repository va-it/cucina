let express = require('express');
let router = express.Router();

router.get('', function(request, response) {
    response.send('API');
});

router.get('/user', function(request, response) {
    response.send({
        "id": 2,
        "name": "John",
    })
});

module.exports = router;