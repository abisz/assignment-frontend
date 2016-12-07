export function es5(cb) {
  setTimeout(function() {
    cb(null, 10)
  }, 1)
}

export function es6() {
  const p = new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 1);
  });

  return p;

  // short
  // return Promise.resolve(10);
}
