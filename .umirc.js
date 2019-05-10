
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        loading: true,
      },
      dynamicImport: false,
      title: 'umi',
      dll: true,
      pwa: false,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  proxy: {
    "/api": {
      "target": "http://localhost:8001",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },


}

