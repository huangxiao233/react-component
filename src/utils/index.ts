function scopeClassName(preClassName: string) {
  return function (lastClassName: string) {
    if (!lastClassName) return preClassName;
    return [preClassName, lastClassName]
      .filter(() => {
        return Boolean;
      })
      .join('-');
  };
}

//深拷贝
function deepClone(target: any) {
  if (typeof target === 'object') {
    if (target instanceof Array) {
      let newObj = new Array();
      for (let key in target) {
        newObj[key] = deepClone(target[key]);
        return newObj;
      }
    } else if (target instanceof Date) {
      return new Date(target);
    } else if (target instanceof RegExp) {
      return new RegExp(target.source, target.flags);
    } else if (target instanceof Function) {
      return function () {};
    } else if (target instanceof Object) {
      let newObj: any = {};
      for (let key in target) {
        newObj[key] = deepClone(target[key]);
        return newObj;
      }
    }
  } else {
    return target;
  }
}

export { scopeClassName, deepClone };
