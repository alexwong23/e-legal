var express = require('express')
var router = express.Router()
var MatchApi = require('../models/matchapi')
var Match = require('../models/match')
var Prediction = require('../models/prediction')

// initial
// assume 28 oct 1659, first game stop predict, show countdown
// assume 28 oct 1859, other games stop predict, show countdown
router.get('/1', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: '2016-10-28T20:00:00Z',
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28T22:00:00Z'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// assume 28 oct 1999, first game start, change status to in-play
router.get('/2', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 0,
        goalsAwayTeam: 0
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// change first game score
router.get('/3', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 0
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// change first game score part 2
router.get('/4', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// assume 28 oct 2130 change first game score part 3 and status to FINISHED
router.get('/5', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// assume 28 oct 2159, other games start, change status to in-play
router.get('/6', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: 0,
        goalsAwayTeam: 0
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: 0,
        goalsAwayTeam: 0
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// change other games score part 2
router.get('/7', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: 0,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// assume 28 oct 2259, remove first game, change other games score part 3
router.get('/8', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 3
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// assume 28 oct 2330, end other games
// assume 29 oct 0059, show no remove bug, dont refresh! not demo step change back to 1
router.get('/9', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: 3,
        goalsAwayTeam: 3
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 2
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'TIMED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// assume 29 oct 1800, no change
// assume 29 oct 1859, games stop predict, show countdown
// assume 29 oct 2159, games start, change status to in-play
router.get('/10', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: 3,
        goalsAwayTeam: 3
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 2
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: 0,
        goalsAwayTeam: 0
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: 0,
        goalsAwayTeam: 0
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// change games score
router.get('/11', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: 3,
        goalsAwayTeam: 3
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 2
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 0
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'IN-PLAY',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// assume 29 oct 2330, end games
// assume 29 oct 0059, show no remove bug
router.get('/12', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/111'
        }
      },
      date: new Date('2016-10-28 20:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Manchester City FC',
      awayTeamName: 'Manchester United FC',
      result: {
        goalsHomeTeam: 2,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/222'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Arsenal FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: 3,
        goalsAwayTeam: 3
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/333'
        }
      },
      date: new Date('2016-10-28 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Leicester City FC',
      awayTeamName: 'Sunderland AFC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 2
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }
  ]
  })
  res.json(matchAPI)
})

// show n7, remove previous, add next week games
router.get('/13', function (req, res) {
  var matchAPI = new MatchApi({
    count: 5,
    fixtures: [{
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/444'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Watford FC',
      awayTeamName: 'Hull City FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/555'
        }
      },
      date: new Date('2016-10-29 22:00:00'),
      status: 'FINISHED',
      matchday: 10,
      homeTeamName: 'Everton FC',
      awayTeamName: 'Chelsea FC',
      result: {
        goalsHomeTeam: 1,
        goalsAwayTeam: 1
      },
      odds: {
        homeWin: 2,
        draw: 3,
        awayWin: 1.5
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/777'
        }
      },
      date: new Date('2016-11-4 20:00:00'),
      status: 'TIMED',
      matchday: 11,
      homeTeamName: 'Manchester United FC',
      awayTeamName: 'Liverpool FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 4,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/888'
        }
      },
      date: new Date('2016-11-4 22:00:00'),
      status: 'TIMED',
      matchday: 11,
      homeTeamName: 'Hull City FC',
      awayTeamName: 'Leicester City FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 2,
        draw: 1,
        awayWin: 2
      }
    }, {
      _links: {
        self: {
          href: 'https://api.football-data.org/v1/fixtures/999'
        }
      },
      date: new Date('2016-11-4 22:00:00'),
      status: 'TIMED',
      matchday: 11,
      homeTeamName: 'Sunderland AFC',
      awayTeamName: 'Arsenal FC',
      result: {
        goalsHomeTeam: null,
        goalsAwayTeam: null
      },
      odds: {
        homeWin: 3,
        draw: 2,
        awayWin: 1
      }
    }
  ]
  })
  res.json(matchAPI)
})

router.delete('/remove', function (req, res) {
  Match.remove({}, function (err) {
    if (err) throw new Error(err)
  })
  Prediction.remove({}, function (err) {
    if (err) throw new Error(err)
  })
  res.json({'status': 'ok'})
})

module.exports = router
