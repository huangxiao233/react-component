function scopeClassName(preClassName: string) {
  return function (lastClassName: string) {
    return [preClassName, lastClassName]
      .filter(() => {
        return Boolean(lastClassName);
      })
      .join('-');
  };
}

export { scopeClassName };
