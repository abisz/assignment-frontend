import $ from 'jquery'
import router from './router'
import homeTpl from './templates/home.hbs'
import playerTpl from './templates/player.hbs'
import contactTpl from './templates/contact.hbs'
import notFoundTpl from './templates/not-found.hbs'

const playerData = {
  'magnus': {
    name: 'Magnus Carlsen',
    imgSource: 'https://cdn.worldchess.com/static/img/nyfide/carlsen_2x.png',
    paragraphs: [
      'Carlsen is a former chess prodigy. He became a Grandmaster in 2004, at the age of 13 years, 148 days. This made him the third-youngest grandmaster in history.',
      'In November 2013 Carlsen became World Champion by defeating Viswanathan Anand in the World Chess Championship 2013. On the May 2014 FIDE rating list, Carlsen reached his peak rating of 2882, which is the highest in history. He successfully defended his title in November 2014, once again defeating Anand. The same year, he also won the World Rapid Championship and the World Blitz Championship, thus holding all three world championship titles. In 2015 Carlsen won the inaugural Grand Chess Tour, a series of three supertournaments featuring the 10 best chess grandmasters in the world.'
    ]
  },
  'sergey': {
    name: 'Sergey Karjakin',
    imgSource: 'https://cdn.worldchess.com/static/img/nyfide/karjakin_2x.png',
    paragraphs: [
      'On March 28, 2016, Sergey Karjakin became the Challenger to Magnus Carlsen in the World Chess Championship 2016 after winning the Candidates Tournament 2016 in Moscow.',
      'Karjakin won the 2012 World Rapid Chess Championship and the Chess World Cup 2015. He also won the Norway Chess Tournament twice (2013, 2014) and the Corus Chess Tournament in 2009.'
    ]
  },
};

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function contact() {
  $app.html(contactTpl())
}

function players(ctx) {

  $app.html(playerTpl(playerData[ctx.params.player]));
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('/players/:player', players)
router('/contact', contact)
router('*', notFound)
router()
