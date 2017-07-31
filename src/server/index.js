import http from 'http';

let app = require('./server');
let currentApp = app;

const server = http.createServer(app);
server.listen(3000);

if (module.hot) {
	module.hot.accept('./server', () => {
		server.removeListener('request', currentApp);
		app = require('./server');
		server.on('request', app);
		currentApp = app;
	});
}