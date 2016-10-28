var express = require('express')
var router = express.Router()
var User = require('../models/user')
var MatchApi = require('../models/matchapi')
var Match = require('../models/match')
var Vote = require('../models/vote')

var g1Date = '2016-10-27 15:00:00'
var g1Date2 = '2016-10-28 12:00:00'
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
      date: new Date(g1Date),
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
      date: new Date(g1Date2),
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

router.post('/demo', function (req, res) {
  var noOfMatches = req.body.count
  var regex = /.*?(\d+)$/
  for (var i = 0; i < noOfMatches; i++) {
    updateResult(i)
  }
  // closures!
  function updateResult (i) {
    var matchnumber = (regex.exec(req.body.fixtures[i]._links.self.href))[1]
    Match.findOne({'matchNo': matchnumber}, function (err, timedMatch) {
      if (err) throw new Error(err)
      if (timedMatch) {
        Match.findOneAndUpdate({'matchNo': matchnumber}, {
          date: req.body.fixtures[i].date,
          status: req.body.fixtures[i].status,
          result: {
            goalsHomeTeam: req.body.fixtures[i].result.goalsHomeTeam,
            goalsAwayTeam: req.body.fixtures[i].result.goalsAwayTeam
          }
        }, function (err, data) {
          if (err) throw new Error(err)
          if (data) {
            if (data.status === 'FINISHED') {
              var matchResult
              if (data.result.goalsHomeTeam === data.result.goalsAwayTeam) {
                matchResult = 'draw'
              } else if (data.result.goalsHomeTeam > data.result.goalsAwayTeam) {
                matchResult = 'homeTeam'
              } else if (data.result.goalsHomeTeam < data.result.goalsAwayTeam) {
                matchResult = 'awayTeam'
              }
              Vote.find({'matchNo': data.matchNo, 'result': null}, function (err, userVotes) {
                if (err) throw new Error(err)
                for (var i = 0; i < userVotes.length; i++) {
                  closuresNo2()
                }
                function closuresNo2 () {
                  var userId = userVotes[i].userid
                  var userPredict = userVotes[i].vote
                  var userToken = 0
                  var userScore = 0
                  if (userPredict === matchResult) {
                    userToken += (userVotes[i].amount * 2)
                    userScore = 1
                  } else if (matchResult === 'draw') {
                    userToken += (userVotes[i].amount)
                  }
                  if (matchResult !== null) {
                    User.findOneAndUpdate({'_id': userId}, {
                      $inc: {
                        'local.tokens': userToken,
                        'local.score': userScore
                      }
                    }, function (err) {
                      if (err) throw new Error(err)
                      Vote.findOneAndUpdate({'userid': userId, 'matchNo': data.matchNo}, {
                        'result': matchResult
                      }, function (err, answer) {
                        if (err) throw new Error(err)
                        console.log(answer)
                      })
                    })
                  }
                }
              })
            }
          }
        })
      }
      if (!timedMatch) {
        var newMatch = new Match({
          matchNo: (regex.exec(req.body.fixtures[i]._links.self.href))[1],
          date: req.body.fixtures[i].date,
          status: req.body.fixtures[i].status,
          matchday: req.body.fixtures[i].matchday,
          homeTeam: req.body.fixtures[i].homeTeamName,
          awayTeam: req.body.fixtures[i].awayTeamName,
          result: {
            goalsHomeTeam: req.body.fixtures[i].result.goalsHomeTeam,
            goalsAwayTeam: req.body.fixtures[i].result.goalsAwayTeam
          },
          odds: {
            homeWin: req.body.fixtures[i].odds.homeWin,
            draw: req.body.fixtures[i].odds.draw,
            awayWin: req.body.fixtures[i].odds.awayWin
          }
        })
        newMatch.save(function (err) {
          if (err) throw new Error(err)
        })
      }
    })
  }
  res.json({'updated': 'ok'})
})

router.delete('/remove', function (req, res) {
  Match.remove({}, function (err) {
    if (err) throw new Error(err)
  })
  Vote.remove({}, function (err) {
    if (err) throw new Error(err)
  })
  res.json({'status': 'ok'})
})

module.exports = router
