let express = require('express');
let path = require('path');
let apiRoutes = require('./backend/api-routes');
let constants = require('./backend/constants');

let frontendApplication = express();
let backendApplication = express();


let frontendServer = frontendApplication.listen(constants.frontendPort, constants.localHost, () => {
    console.info(
        `Frontend server started and listening at http://${frontendServer.address().address}:${frontendServer.address().port}`
    );
});

let backendServer = backendApplication.listen(constants.backendPort, constants.localHost, () => {
    console.info(
        `Backend server started and listening at http://${backendServer.address().address}:${backendServer.address().port}`
    );
});

frontendApplication.use(express.static(path.join(__dirname, 'frontend/dist/app')));

backendApplication.use(apiRoutes);

