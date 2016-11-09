// Todo: implement dynamic routes

let routes = new Map();

function initEventListeners () {

  const links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {
    // Todo: check for real links
    links[i].addEventListener('click', e => {
      e.preventDefault();
      goto(e.srcElement.pathname)
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
