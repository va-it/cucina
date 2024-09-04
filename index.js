let express = require('express');
let path = require('path');
let apiRoutes = require('./backend/api-routes');

let localHost = '127.0.0.1';

let frontendApplication = express();
let backendApplication = express();

let frontendPort = 3000;
let backendPort = 3001;

let frontendServer = frontendApplication.listen(frontendPort, localHost, () => {
    console.info(
        `Frontend server started and listening at http://${frontendServer.address().address}:${frontendServer.address().port}`
    );
});

let backendServer = backendApplication.listen(backendPort, localHost, () => {
    console.info(
        `Backend server started and listening at http://${backendServer.address().address}:${backendServer.address().port}`
    );
});

frontendApplication.use(express.static(path.join(__dirname, 'frontend/dist/app')));

backendApplication.use(apiRoutes);

