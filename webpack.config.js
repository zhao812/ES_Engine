const path = require("path"),
    process = require("process"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    webpack = require("webpack"),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    WebpackDevServer = require("webpack-dev-server"),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// AppCachePlugin = require('appcache-webpack-plugin');

const PATHS = {
    plungsPath: path.resolve(process.cwd(), "./src") + "/plungs/"
}
// let buildPath = "/build",env="development";

const CONFIG = {
    "development": {
        "buildPath": "/build",
        "output": {
            path: __dirname + "/build",
            filename: "bundle.js",
            chunkFilename: 'build[name].js'
        }
    },
    "dev": {
        "buildPath": "/ceshi",
        "output": {
            path: __dirname + "/ceshi",
            filename: "bundle-[hash:8].js",
            chunkFilename: 'build[name]-[hash:8].js'
        }
    },
    "us": {
        "buildPath": "/build",
        "output": {
            path: __dirname + "/build",
            filename: "bundle-[hash:8].js",
            chunkFilename: 'build[name]-[hash:8].js'
        }
    },
    "production": {
        "buildPath": "/dist",
        "output": {
            path: __dirname + "/dist",
            filename: "bundle-[chunkhash:8].js",
            chunkFilename: 'build[name]-[chunkhash:8].js'
        }
    },
    "alias": {
        "$$": PATHS.plungsPath + "zepto/zepto.js"
    }
}

const getBaseConfig = (env) => {
    return {
        entry: {
            app: "./src/index.js",
            vendor: [
                '$'
            ]
        },
        output: CONFIG[env].output,
        resolve: {
            alias: CONFIG.alias
        },
        target: "web",
        plugins: [],
        module: {}
    }
}

const getLoaders = (env) => {
    var sourceMap = "";

    if (env === "development") {
        sourceMap = "?sourceMap";
    } else if (env === "dev") {
        sourceMap = "?sourceMap";
    }
    sourceMap = "";
    return {
        noParse: /node_modules\/(jquey|moment|chart|lodash\.js)/,
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }, 
            
            //css less
            {
                test: /\.(scss|css|less)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
            },

            {
                test: /\.art$/,
                loader: "art-template-loader"
            }, 
            
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=2000&name=images/[hash:8].[name].[ext]'
            }
        ]
    }
}

const getEnvConfig = (env) => {
    if (env === "development") {
        return {
            // devtool: "eval",
            devtool: "source-map",
            devServer: {
                contentBase: './build',
                hot: true,
                host: "127.0.0.1",
                port: 8080,
                disableHostCheck: true,
                proxy: {
                    "/api/*": {
                        // target: 'http://192.168.7.123:8600/',
                        target:'http://10.172.20.28:8088/',
                        secure: false,
                        changeOrigin: true
                    }
                    //  "/oneday/api/*":{     target: 'http://192.168.132.44/oneday/api',
                    // secure: false,     changeOrigin: true }
                }
            }
        }
    } else if (env === "us") {
        return {
            // devtool: "eval",
            devtool: "source-map",
            devServer: {
                contentBase: './build',
                hot: true,
                host: "0.0.0.0",
                port: 8080,
                disableHostCheck: true,
                proxy: {
                    "/oneday/api/": {
                        target: 'http://192.168.132.44/',
                        // target: 'http://0.0.0.0:3000/',
                        // target: 'http://192.168.132.44/oneday/api/',
                        secure: false,
                        changeOrigin: true
                    }
                }
            }
        }
    } else {
        return {};
    }
}

const getPlugins = (env) => {
    // env =( env==="us"?"development":env);
    let plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                // 'NODE_ENV':env
                'NODE_ENV': JSON.stringify(env)
            }
        }),
        new ExtractTextPlugin({filename: ("style.css"), allChunks: false}),
        // new webpack.optimize.CommonsChunkPlugin({     name: "commons",     filename:
        // "common.js",     children:true     // minChunks:2   })
        new CommonsChunkPlugin({name: "vendor", filename: "vendor.js", minChunks: Infinity})
    ];
    let newPlugins;
    if (env === "development") {
        newPlugins = [
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(['build']),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: __dirname + '/src/index.html',
                inject: 'true'
            })
        ]
    } else if (env === "dev") {
        newPlugins = [
            new webpack
                .optimize
                .MinChunkSizePlugin({
                    minChunkSize: 51200,
                    compress: {
                        warnings: false
                    }
                }),
            new webpack
                .optimize
                .LimitChunkCountPlugin({maxChunks: 50, entryChunkMultiplicator: 2}),
            new webpack
                .optimize
                .UglifyJsPlugin({
                    compressor: {
                        warnings: false
                    },
                    sourceMap: true
                }),
            new CleanWebpackPlugin(['ceshi']),
            new HtmlWebpackPlugin({
                filename: 'index.htm',
                template: __dirname + '/src/index.html',
                inject: 'true'
            })
        ]
    } else if (env === "us") {
        newPlugins = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack
                .optimize
                .MinChunkSizePlugin({
                    minChunkSize: 51200,
                    compress: {
                        warnings: false
                    }
                }),
            new webpack
                .optimize
                .LimitChunkCountPlugin({maxChunks: 50, entryChunkMultiplicator: 2}),
            // new webpack.optimize.Ugli    fyJsPlugin({compressor: {warnings:
            // false},sourceMap: true}),
            new CleanWebpackPlugin(['build']),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: __dirname + '/src/index.html',
                inject: 'true'
            })
        ]
    } else {
        newPlugins = [
            // new webpack.optimize.MinChunkSizePlugin({minChunkSize: 51200,compress:
            // {warnings: false}}), new webpack.optimize.LimitChunkCountPlugin({maxChunks:
            // 50, entryChunkMultiplicator: 2}),
            new webpack
                .optimize
                .UglifyJsPlugin({
                    compressor: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }),
            new CleanWebpackPlugin(['dist']),
            new BundleAnalyzerPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.htm',
                template: __dirname + '/src/index.html',
                inject: 'true',
                minify: {
                    minifyJS: true, // 压缩js
                    // collapseWhitespace:true,// 移除space
                    conservativeCollapse: true, //
                    removeComments: true
                }
            }),
            // new AppCachePlugin({     cache: ['someOtherAsset.jpg'],     network: null,
            // // No network access allowed!     fallback: ['failwhale.jpg'],     settings:
            // ['prefer-online'],     exclude: ['file.txt', /.*\.js$/],  // Exclude file.txt
            // and all .js files     output: 'my-manifest.appcache' })
        ]
    }
    return plugins.concat(newPlugins);
}

const init = (env = "development") => {

    let baseConfig = getBaseConfig(env);

    let module = getLoaders(env);
    let envConfig = getEnvConfig(env);

    let plugins = getPlugins(env);
    console.log("环境变量为", envConfig)

    // console.info("环境信息为"+JSON.stringify(process.env))

    let newConfig = Object.assign({}, baseConfig, envConfig, {
        "module": module
    }, {"plugins": plugins});

    return newConfig;
    // return false;
}

// let config = init(env); console.log("p:    "+process.env.NODE_ENV); var
// config = init(); WebpackDevServer var compiler = webpack(config); var server
// = new WebpackDevServer(compiler, config.devServer); server.listen(8080,
// "127.0.0.1", function () {     console.log('Listening at
// http://127.0.0.1:8080') })

const getEnvParam = () => {
    let argus = [],
        startIndex = false,
        endIndex = 0;

    process
        .argv
        .forEach(function (val, index, array) {
            if (val === "--env") {
                startIndex = endIndex = index;
                return;
            } else if (val.indexOf("_") >= 0) {
                startIndex = false;
            }
            endIndex += (startIndex !== false
                ? 1
                : 0);
        });

    // console.log("startInde:"+startIndex+"\n endIndex:"+endIndex)
    // console.log("自定义配置信息1为\n"+JSON.stringify(process.argv));
    argus = process
        .argv
        .splice(startIndex, endIndex);
    // console.log("自定义配置信息2为\n"+JSON.stringify(process.argv));
    // console.log("自定义配置信息3为\n"+JSON.stringify(argus));

    argus.splice(0, 1);
    return argus;
}

// process.env["npm_lifecycle_script"] = "kkkk";
// process.env["npm_package_scripts_start"] = "kkkk";
// console.log("环境变量为:",JSON.stringify(getEnvParam()));
let config = init(...getEnvParam());

//  console.log(JSON.stringify(config))
module.exports = config;