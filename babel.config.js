module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],

      "alias": {
        "test": "./test",
        "underscore": "lodash"
      }
    }],
    'nativewind/babel',
    ["react-native-reanimated/plugin", {
      "relativeSourceLocation": true
    }]
  ],
};
