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

export { scopeClassName };
