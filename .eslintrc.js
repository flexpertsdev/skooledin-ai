module.exports = {
  root: true,
  extends: [
    '@nuxt/eslint-config',
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off'
  }
}