// module.exports = {
//   plugins: {
//     autoprefixer: {},
//   },
// };

const tailwindcss = require('tailwindcss');

module.exports = {
  plugins:
    [
      require('tailwindcss')('tailwind.js'),
      require('autoprefixer')(),
    ],
};
