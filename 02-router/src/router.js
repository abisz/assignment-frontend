const reExternal = /^(https:\/\/|http:\/\/)(www\.)?(.+\.\w{2,})\/?$/;

let routes = new Map();

function initEventListeners () {

  const links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {

    links[i].addEventListener('click', e => {
      const link = e.srcElement,
        href = link.getAttribute('href');

      if (
        typeof link.getAttribute('download') !== 'string' &&
        link.getAttribute('rel') !== 'download' &&
        link.getAttribute('target') !== '_blank' &&
        link.getAttribute('rel') !== 'external' &&
        ! (reExternal.test(href) && reExternal.match(href)[3] === window.location.hostname)
      ) {

        e.preventDefault();
        console.log(link.getAttribute('href'));
        goto(link.getAttribute('href'))
      }
    });
  }

  window.onpopstate = function (e) {
    goto(e.state.pathname);
  }
}

function init () {
  const path = window.location.pathname;

  console.log('init', path);

  goto(path);
}

function goto (route) {
  window.history.pushState({
    pathname: route
  }, '', route);

  for ( let [key, fn] of routes.entries() ) {

    let params = [];

    if (key.split(':').length > 1) {

      const routeLength = key.split('/').length -1;

      let routeRegexString = '';

      for (let j = 0; j < routeLength; j++) {
        // didn't find a better way to match capture group multiple times
        routeRegexString += '(\/\:?[a-zA-Z0-9]+)';
      }

      const routeRegex = new RegExp(routeRegexString);

      let regexString = '';

      const routeParts = routeRegex.exec(key);

      for (let i = 1; i < routeParts.length; i++) {
        if ( routeParts[i].indexOf(':') == -1 ) {
          regexString += routeParts[i].replace('/', '\\/');
        } else {
          regexString += '\\/([a-zA-Z0-9]*)';
        }
      }

      regexString += '$';

      const dynamicRegex = new RegExp(regexString);

      if (dynamicRegex.test(route)) {
        return fn(...dynamicRegex.exec(route).slice(1))
      }
    }

    if (key === route) return fn(...params);
  }

  if (routes.has('*')) {
    return routes.get('*')();
  }
}

export default function (route, fn) {

  if (route && fn) {
    routes.set(route, fn);
    return;
  }

  if (!route && !fn) {
    initEventListeners();
    init();
  }
}
