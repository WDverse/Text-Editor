// Import necessary webpack and plugin modules
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// Export a function that returns the webpack configuration
module.exports = () => {
  return {
    mode: "development", // Set the mode to development
    entry: {
      main: "./src/js/index.js", // Entry point for the 'main' bundle
      install: "./src/js/install.js", // Entry point for the 'install' bundle
    },
    output: {
      filename: "[name].bundle.js", // Output bundle file names will include 'main.bundle.js' and 'install.bundle.js'
      path: path.resolve(__dirname, "dist"), // Output files will be stored in the 'dist' directory
    },
    plugins: [
      // Webpack plugin that generates an HTML file and injects bundle scripts into it
      new HtmlWebpackPlugin({
        template: "./index.html", // HTML template file
        title: "Jate", // Title for the HTML page
      }),

      // Webpack plugin that injects a custom service worker into the build
      new InjectManifest({
        swSrc: "./src-sw.js", // Source file for the service worker
        swDest: "src-sw.js", // Destination file for the injected service worker
      }),

      // Webpack plugin that generates a manifest.json file for the Progressive Web App (PWA)
      new WebpackPwaManifest({
        fingerprints: false, // Do not generate fingerprints for assets
        inject: true, // Inject the manifest into the HTML
        name: "J.A.T.E", // Name of the PWA
        short_name: "Jate", // Short name for the PWA
        description: "Your cool text editor", // Description of the PWA
        background_color: "#225ca3", // Background color
        theme_color: "#225ca3", // Theme color
        start_url: "./", // Start URL
        publicPath: "./", // Public path for assets
        icons: [
          {
            src: path.resolve("src/images/logo.png"), // Path to the PWA icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join("assets", "icons"), // Destination directory for icons
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i, // Use CSS loader for CSS files
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/, // Use Babel loader for JavaScript files
          exclude: /node_modules/, // Exclude 'node_modules'
          use: {
            loader: "babel-loader", // Use Babel loader
            options: {
              presets: ["@babel/preset-env"], // Babel preset for environment compatibility
              plugins: [
                "@babel/plugin-proposal-object-rest-spread", // Babel plugin for object rest spread
                "@babel/transform-runtime", // Babel plugin for runtime transformation
              ],
            },
          },
        },
      ],
    },
  };
};
