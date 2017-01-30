import router from './router'
//noinspection JSUnresolvedVariable
import homeTpl from './templates/home.hbs'
//noinspection JSUnresolvedVariable
import simpleTpl from './templates/simple.hbs'
//noinspection JSUnresolvedVariable
import styleTpl from './templates/style.hbs'
//noinspection JSUnresolvedVariable
import animationTpl from './templates/animation.hbs'
//noinspection JSUnresolvedVariable
import textTpl from './templates/text.hbs'
//noinspection JSUnresolvedVariable
import interactionTpl from './templates/interaction.hbs'
//noinspection JSUnresolvedVariable
import notFoundTpl from './templates/not-found.hbs'
import SlideButton from './SlideButton'

const app = document.getElementById('app');

function index() {
  app.innerHTML = homeTpl()
}

function simple() {
  app.innerHTML = simpleTpl()
}

function style() {
  app.innerHTML = styleTpl()
}

function animation() {
  app.innerHTML = animationTpl()
}

function text() {
  app.innerHTML = textTpl()
}

function interaction() {
  app.innerHTML = interactionTpl();
  const element = document.querySelector('.slide-button');
  new SlideButton(element, 'commit', "commited")
}

function notFound() {
  app.innerHTML = notFoundTpl()
}
router('/', index);
router('/simple', simple);
router('/style', style);
router('/animation', animation);
router('/text', text);
router('/interaction', interaction);
router('*', notFound);
router();
