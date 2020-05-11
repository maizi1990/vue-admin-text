const path = require("path")
module.exports = {
	// 基本路径
	publicPath: process.env.NODE_ENV === "production" ? "" : "/",
	// 输出文件目录
	outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
	// eslint-loader 是否在保存的时候检查
	lintOnSave: false,
	chainWebpack: config => {
		const svgRule = config.module.rule("svg")
		svgRule.uses.clear()
		svgRule
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "icon-[name]",
				include: ["./src/icons"]
			})
	},
	configureWebpack: config => {
		config.resolve = {
			// 配置解析别名
			extensions: [".js", ".json", ".vue"],
			alias: {
				//改变vue的默认指向
				vue: "vue/dist/vue.js",
				"@": path.resolve(__dirname, "./src")
			}
		}
	},
	// 生产环境是否生成 sourceMap 文件
	productionSourceMap: false,
	// css相关配置
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			scss: {
				//样式表主入口
				prependData: `@import "./src/styles/main.scss";`
			}
		}
		// 启用 CSS modules for all css / pre-processor files.
		// modules: false
	},

	parallel: require("os").cpus().length > 1,
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		open: false, // 编译完成是否打开网页
		host: "0.0.0.0", // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
		port: 8080, // 访问端口
		https: false, // 编译失败时刷新页面
		hot: true, // 开启热加载
		hotOnly: false,
		proxy: {
			"/api": {
				target: "http://www.web-jshtml.cn/productapi/token", // 你请求的第三方接口
				changeOrigin: true, // 允许跨域
				pathRewrite: {
					// 路径重写，
					"^/api": ""
				}
			}
		},
		overlay: {
			// 全屏模式下是否显示脚本错误
			warnings: true,
			errors: true
		},
		before: app => {}
	},
	/**
	 * 第三方插件配置
	 */
	pluginOptions: {}
}
