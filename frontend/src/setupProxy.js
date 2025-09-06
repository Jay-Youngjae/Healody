const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        "/api",
        createProxyMiddleware( {
            target: 'https://port-0-healody-ac2nlkqfipr3.sel4.cloudtype.app',
            changeOrigin: true
        })
    )

};