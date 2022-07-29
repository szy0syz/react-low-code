# React-Low-Code

> 尽能力用原生写个低代码拖拽H5。

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

![layouts](https://user-images.githubusercontent.com/10555820/181425102-fc2039a6-796b-48c2-b33e-a0eb743bf3f9.png)

- 有些时候，面对复杂业务，函数组件承载能力的确不如类组件，应该折中考虑，该换就换！
