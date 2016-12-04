export function es5(n) {
  function counter(n) {
    var cnt = 0

    function next() {
      if (cnt < n) {
        return cnt += 1
      }
    }

    return next
  }

  return counter(n)
}

// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/function*
// TODO: test fails - issue with mocha or babel
export function es6(n) {
  function* counter(n) {
    let cnt = 1;

    while(cnt < n) {
      yield cnt++;
    }
  }

  return counter(n);
}
