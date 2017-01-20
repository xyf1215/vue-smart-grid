module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // parseInt必须指定第二个参数
    'radix': 2,
    // 必须使用全等
    'eqeqeq': 2,
    // 函数前不能有空格
    'space-before-function-paren': [0, 'always'],
    // 小括号中不能有空格
    'space-in-parens': ['error', 'never'],
    // 不能使用var
    'no-var': 'error',
    // 箭头函数必须有括号,当只有一个参数时允许省略圆括号
    'arrow-parens': ['error', 'as-needed'],
    // 使用箭头函数作为回调
    'prefer-arrow-callback': 'error',
    // // 使用模板而非字符串连接
    // 'prefer-template': 'error',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
