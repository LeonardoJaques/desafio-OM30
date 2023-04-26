module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://viacep.com.br',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/users':{
        target: 'http://localhost:3001/users',
        changeOrigin: true,
        pathRewrite: {
          '^/users': ''
        }
      }
    }
  }
}
