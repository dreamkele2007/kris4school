/**
 * Created by chenty on 2017/6/8.
 */
function rewireLess(config, env, sassLoaderOptions = {}) {
    const sassExtension = /\.scss$/;

    const fileLoader = config.module.rules
        .find(rule => rule.loader && rule.loader.endsWith('/file-loader/index.js'));
    fileLoader.exclude.push(sassExtension);

    const cssRules = config.module.rules
        .find(rule => String(rule.test) === String(/\.css$/));



    let sassRules;
    if (env === 'production') {
        sassRules = {
            test: sassExtension,
            loader: [
                // TODO: originally this part is wrapper in extract-text-webpack-plugin
                //       which we cannot do, so some things like relative publicPath
                //       will not work.
                //       https://github.com/timarney/react-app-rewired/issues/33
                ...cssRules.loader,
                {loader: require.resolve('sass-loader'), options: sassLoaderOptions}
            ]
        };
    } else {
        const cssLoader = cssRules.use.find(use => use.loader && use.loader.endsWith('/css-loader/index.js'));
        const postcssLoader = cssRules.use.find(use => use.loader && use.loader.endsWith('/postcss-loader/lib/index.js'));
        cssLoader.options.sourceMap = true;
        postcssLoader.options.sourceMap = true;

        sassRules = {
            test: sassExtension,
            use: [
                ...cssRules.use,
                {
                    loader: require.resolve('sass-loader'),
                    options: sassLoaderOptions
                }
            ]
        };
    }

    config.module.rules.push(sassRules);

    return config;
}

module.exports = rewireLess;