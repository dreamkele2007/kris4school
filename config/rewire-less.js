/**
 * Created by chenty on 2017/6/8.
 */
function rewireLess(config, env, lessLoaderOptions = {}) {
    const lessExtension = /\.less$/;

    const fileLoader = config.module.rules
        .find(rule => rule.loader && rule.loader.indexOf('file-loader')>-1);
    fileLoader.exclude.push(lessExtension);

    const cssRules = config.module.rules
        .find(rule => String(rule.test) === String(/\.css$/));



    let lessRules;
    if (env === 'production') {
        lessRules = {
            test: lessExtension,
            loader: [
                // TODO: originally this part is wrapper in extract-text-webpack-plugin
                //       which we cannot do, so some things like relative publicPath
                //       will not work.
                //       https://github.com/timarney/react-app-rewired/issues/33
                ...cssRules.loader,
                {loader: require.resolve('less-loader'), options: lessLoaderOptions}
            ]
        };
    } else {
        const cssLoader = cssRules.use.find(use => use.loader && use.loader.indexOf('css-loader')>-1);
        const postcssLoader = cssRules.use.find(use => use.loader && use.loader.indexOf('postcss-loader')>-1);
        cssLoader.options.sourceMap = true;
        postcssLoader.options.sourceMap = true;
        lessRules = {
            test: lessExtension,
            use: [
                ...cssRules.use,

                {loader: require.resolve('less-loader'), options: lessLoaderOptions}
            ]
        };
    }

    config.module.rules.push(lessRules);

    return config;
}

module.exports = rewireLess;
