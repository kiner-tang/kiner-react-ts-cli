const path = require('path');
const postcssAspectRatioMini = require('postcss-aspect-ratio-mini');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcssWriteSvg = require('postcss-write-svg');
const postcssCssnext = require('postcss-cssnext');
const postcssViewportUnits = require('postcss-viewport-units');
const cssnano = require('cssnano');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const webpack = require('webpack');
const ImageProfilePlugin = require('./webpack-plugins/image-profile-plugin');

const {
  override,
  addPostcssPlugins,
  addWebpackAlias,
  overrideDevServer,
  fixBabelImports,
  addLessLoader,
} = require('customize-cra');

const devServerConfig = () => config => {
  return {
    ...config,
  };
};


const stringified = {
  'process.env': Object.keys(process.env).reduce((env, key) => {
    env[key] = JSON.stringify(process.env[key]);
    return env;
  }, {}),
};

const addCustomize = () => config => {
  // 暴露webpack的配置 config ,evn
  const paths = require('react-scripts/config/paths');
  paths.appBuild = path.join(path.dirname(paths.appBuild), `/output/${process.env.BUILD_ENV}`);
  config.output.path = paths.appBuild;
  config.output.publicPath = './';
  config.plugins.push(new webpack.DefinePlugin(stringified));
  config.plugins.push(new ImageProfilePlugin({
    imagePath: "media"
  }));

  return config;
};

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve('src'),
    }),
    (config) => {
      return rewireReactHotLoader(config, process.env.NODE_ENV);
    },
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css', // 自动打包相关的样式 默认为 style:'css'
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
      },
    }),
    addPostcssPlugins([require('postcss-flexbugs-fixes'),
      postcssAspectRatioMini({}),
      postcssPxToViewport({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
      }),
      postcssWriteSvg({
        utf8: false,
      }),
      postcssCssnext({}),
      postcssViewportUnits({}),
      cssnano({
        // preset: "advanced",
        autoprefixer: false,
        'postcss-zindex': false,
      }),
    ]),
    addCustomize(),
  ),
  devServer: overrideDevServer(devServerConfig()),

};

