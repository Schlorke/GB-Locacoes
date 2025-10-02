/* eslint-env node */
/* eslint-disable no-undef */
export default {
  source: ['design-tokens/**/*.json'],
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/kebab', 'size/px', 'color/css'],
      buildPath: 'design-tokens/output/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            showFileHeader: true,
          },
        },
      ],
    },
    scss: {
      transforms: ['attribute/cti', 'name/kebab', 'size/px', 'color/css'],
      buildPath: 'design-tokens/output/',
      files: [
        {
          destination: 'tokens.scss',
          format: 'scss/variables',
          options: {
            outputReferences: true,
            showFileHeader: true,
          },
        },
      ],
    },
    json: {
      transforms: ['attribute/cti', 'name/kebab', 'size/px', 'color/css'],
      buildPath: 'design-tokens/output/',
      files: [
        {
          destination: 'tokens-tailwind.json',
          format: 'json/flat',
          options: {
            outputReferences: true,
            showFileHeader: true,
          },
        },
      ],
    },
    js: {
      transforms: ['attribute/cti', 'name/kebab', 'size/px', 'color/css'],
      buildPath: 'design-tokens/output/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/module',
          options: {
            outputReferences: true,
            showFileHeader: true,
          },
        },
      ],
    },
  },
}
