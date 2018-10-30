const modoDev = process.env.NODE_ENV !== 'production' //Verifica se estamos em Desenvolvimento ou Produção
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require ('mini-css-extract-plugin'); // Deixa CSS em arquivo especifico
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');  //Minifica JS
const OptimizeCSSAssetsPlugin = require ('optimize-css-assets-webpack-plugin'); // Minifica CSS

module.exports = {
  mode : modoDev ? 'development' : 'production', 
  entry: './src/main.js',
  output : {
    filename : 'main.js',
    path : __dirname  + '/public' 
  },
  devServer : {
    contentBase : "./public",
    port: 8080
  },
  optimization : { 
    minimizer : [
      new UglifyJsPlugin({
         cache: true ,
         parallel : true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module : {
    rules : [
      {
        test: /\.s?[ac]ss$/,
        use:[
              MiniCssExtractPlugin.loader,
             'css-loader',
             'sass-loader'            
            ]          
       },{
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
       }  
     ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ] 
}
       
      
    