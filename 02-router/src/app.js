import $ from 'jquery'
import router from './router'
import homeTpl from './templates/home.hbs'
import contactTpl from './templates/contact.hbs'
import notFoundTpl from './templates/not-found.hbs'

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function contact() {
  $app.html(contactTpl())
}

function notFound() {
  $app.html(notFoundTpl())
}

function player(name) {
  console.log('Dynamic Route:', name);
}

function playerRankingMonth(player, month) {
  console.log('Player:', player);
  console.log('Month:', month);
}

function allPlayersFromYear(year){
  console.log('all players from year:', year);
}

router('/', index)
router('/contact', contact)
router('/player/:player', player)
router('/player/all/:year', allPlayersFromYear)
router('/player/:player/ranking/:month', playerRankingMonth)
router('*', notFound)
router()
