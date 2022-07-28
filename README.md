# React-Low-Code

## Notes

- 关于脚手架的选择？
  - dva 虽然redux和redux-saga的数据流好，但redux不太符合响应式状态管理，就不选择了吧
  - umi 好也是一条龙，坏也是一条龙，提供的太多了，还是选择轻量点的，毕竟项目不简单
  - next 用得太多了，就不用了
  - vite 虽然很快，但出于保守考虑，还是不选了
  - cra 出于稳定，还是就它吧

- 为了让 less 支持 module-css

```js
// * 配置完成后记得重启下
const CracoLessPlugin = require("craco-less");

module.exports = {
  babel: {
    //用来支持装饰器
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: { javascriptEnabled: true },
        },
        modifyLessRule: function () {
          return {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[local]_[hash:base64:6]",
                  },
                },
              },
              { loader: "less-loader" },
            ],
          };
        },
      },
    },
  ],
};
```
