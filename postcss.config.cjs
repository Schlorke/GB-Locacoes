// postcss.config.cjs
// Converted from ESM to CJS for compatibility with Next.js PostCSS
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'iOS >= 9',
        'Safari >= 9',
        'Chrome >= 54',
        'Edge >= 79',
        'Firefox >= 60',
      ],
    },
  },
}
