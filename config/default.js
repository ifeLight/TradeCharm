var defer = require('config/defer').deferConfig;

module.exports = {
    db: {
        host: "localhost",
        port: 21017,
        username: "",
        password: "",
        dbname: "tradecharm",
        optionsCollection: 'options',
        uri: defer(function () {
            const { host, port, username, password, dbname} = this.db;
            return `mongodb://${username && password ? username + ':' + password + '@ ': ''}${host}${port? ':' + port : ''}/${dbname}`;
        })
    }
}