const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
	configureWebpack: (config) => {
		config.devtool = 'source-map'
	},	
	pluginOptions: {
		electronBuilder: {
			preload: 'src/preload.js',
			builderOptions: {
				productName: "AB NeoView",
				appId: 'com.github.hacaro76.ABNeoViewFE',
				publish: [{
					provider: "github",
					owner: "hacaro76",
					repo: "ABNeoViewFE",
					releaseType: "release"
				}],
				win: {
					"target": [
						"nsis"
					],
					icon: 'dist_electron/.icon-ico/icon.ico'
				},
				mac: {
					hardenedRuntime: true,
					entitlements: 'dist_electron/entitlements.mac.plist',
					entitlementsInherit: 'dist_electron/entitlements.mac.plist',
					icon: 'dist_electron/.icon-ico/icon.png'
				},
				afterSign: 'dist_electron/notarize.js',
				"nsis": {
					"installerIcon": "dist_electron/.icon-ico/icon.ico",
					"uninstallerIcon": "dist_electron/.icon-ico/icon.ico",
					"uninstallDisplayName": "AB NeoView",
					"oneClick": true,
					"perMachine": false,
					"allowToChangeInstallationDirectory": false
				}
			},
		},
	},
})
