const fs = require('fs');
const path = require('path');

module.exports = config => {
	config.devServer = {
		host: 'localhost',
		port: 8088,
		disableHostCheck: true
	};
}
