// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
   rules: {
      // JS/JSX rules
      'indent': ['error', 3],
      'no-multi-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // Vue template specific rules:
      // Enforce consistent indentation in <template>
      'vue/html-indent': ['error', 3, {
         "attribute": 1, // indent attributes by one level
         "baseIndent": 1, // base indent for content inside your <template>
         "closeBracket": 0, // no additional indenting for a closing bracket
         "ignores": [] // elements to ignore, if any
      }],
      // Enforce self-closing rules for HTML elements in Vue templates:
      'vue/html-self-closing': ['error', {
         html: {
            void: 'always', // void elements (like <img/>, <br/>, etc.) should always self-close
            normal: 'never', // normal HTML elements should have separate closing tags
            component: 'always' // Vue components should self-close if they have no content
         },
         svg: 'always', // enforce self closing for SVG elements
         math: 'always' // enforce self closing for MathML elements
      }]
   }
})
