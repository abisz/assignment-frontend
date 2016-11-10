// Todo: implement dynamic routes
// Todo: problem with subdomains?
const reExternal = /^(https:\/\/www\.|http:\/\/www\.|www\.)(.+\.\w{2,})\/?$/;

let routes = new Map();

function initEventListeners () {

  const links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {

    links[i].addEventListener('click', e => {
      const link = e.srcElement;

      console.log(window.location);

      if (typeof link.getAttribute('download') !== 'string' &&
        link.getAttribute('target') !== '_blank') {

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
    if (key === route) return fn();
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
