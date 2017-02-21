/**
 * 判断对象是否为空(没有key)
 */
export const isEmptyObject = obj => {
  return !obj || Object.keys(obj).length === 0
}

/**
 * 获取变量类型
 * @param  {Object} variable 任意类型变量
 * @return {String}     {} => Object, "" => String
 */
export const getVariableType = variable => {
  return /\[\w+\s(\w+)\]/.exec(Object.prototype.toString.call(variable))[1]
}

/**
 * 判断变量是不是对象
 * @param  {Object}  variable 待验证的对象
 * @return {Boolean}
 */
export const isObject = variable => {
  return getVariableType(variable) === 'Object'
}

/**
 * 判断变量是不是数组
 * @param  {Object}  variable 待验证的数组
 * @return {Boolean}
 */
export const isArray = variable => {
  return getVariableType(variable) === 'Array'
}

/**
 * 判断变量是不是字符串
 * @param  {Object}  variable 待验证的字符串
 * @return {Boolean}
 */
export const isString = variable => {
  return getVariableType(variable) === 'String'
}

/**
 * 判断变量是不是数字
 * @param  {Object}  variable 待验证的数字
 * @return {Boolean}
 */
export const isNumber = variable => {
  return getVariableType(variable) === 'Number'
}

/**
 * 判断变量是不是正则
 * @param  {Object}  variable 待验证的正则
 * @return {Boolean}
 */
export const isRegExp = variable => {
  return getVariableType(variable) === 'RegExp'
}

/**
 * 判断变量是不是函数
 * @param  {Object}  variable 待验证的函数
 * @return {Boolean}
 */
export const isFunction = variable => {
  return getVariableType(variable) === 'Function'
}

/**
 * 递归获取对象的值
 * @param  {Object} obj 对象
 * @param  {String} key key
 * @return {String}
 */
export const getObjDeepVal = (obj, key) => {
  if (key.indexOf('.') === -1) {
    // 最后一层
    return obj[key]
  }
  const keys = key.split('.')
  const currentKey = keys.splice(0, 1)[0]
  return getObjDeepVal(obj[currentKey], keys.join('.'))
}
