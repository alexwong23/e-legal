$(document).ready(function () {
  var admin = io()
  var liveMatch = []
  var createdDOM = false
  var liveChange = false
  var liveMatchNo
  admin.on('server event', function (dbData) {
    if (dbData.update.length !== liveMatchNo) {
      liveChange = true
    }
    liveMatch = dbData
    liveMatchNo = liveMatch.update.length
    realLife()
    return liveMatch
  })

  function realLife () {
    if (liveChange === true) {
      $('.updateRow').remove()
      liveChange = false
      createdDOM = false
    }
    if (liveMatch.length !== [] && createdDOM === false) {
      createdDOM = true
      liveMatch.update.forEach(function (match) {
        $('#' + match.matchNo).remove()
        var row = $('<div class="row updateRow"><div class="col-sm-4"><div class="card card-block text-xs-left ' + match.matchNo + 'updateLeft"></div></div><div class="col-sm-4"><div class="card card-block text-xs-center"><div class="card-header ' + match.matchNo + 'updateMiddleHeader"></div><div class="' + match.matchNo + 'updateMiddle"></div><div class="card-footer text-muted ' + match.matchNo + 'updateMiddleFooter"></div></div></div><div class="col-sm-4"><div class="card card-block text-xs-right ' + match.matchNo + 'updateRight"></div></div></div>')
        $('.updateContainer').append(row)
        function teamDiv (side, imgSrc, headerText, shortName) {
          var img = $('<img>')
          img.attr({
            'class': 'card-img-top logo',
            'src': imgSrc,
            'alt': 'Team Logo'
          })
          $('.' + side).append(img)
          var header = $('<h4>')
          header.attr('class', 'card-title')
          header.text(headerText)
          $('.' + side).append(header)
          var para = $('<p>')
          para.attr('class', 'card-text')
          para.text(shortName)
          $('.' + side).append(para)
        }
        teamDiv(match.matchNo + 'updateLeft', liveMatch.teamObj.crests[match.homeTeam], match.homeTeam, liveMatch.teamObj.shortName[match.homeTeam])
        teamDiv(match.matchNo + 'updateRight', liveMatch.teamObj.crests[match.awayTeam], match.awayTeam, liveMatch.teamObj.shortName[match.awayTeam])
        function scoreDiv () {
          var header = $('<h4>')
          header.attr({
            'class': 'card-title headerScore',
            'id': match.matchNo + 'Header'
          })
          $('.' + match.matchNo + 'updateMiddleHeader').append(header)
          var homeScore = $('<h2>')
          homeScore.attr({
            'class': 'col-sm-5 homeScore',
            'id': match.matchNo + 'Home'
          })
          $('.' + match.matchNo + 'updateMiddle').append(homeScore)
          var divider = $('<h2>')
          divider.attr('class', 'col-sm-2')
          divider.text(':')
          $('.' + match.matchNo + 'updateMiddle').append(divider)
          var awayScore = $('<h2>')
          awayScore.attr({
            'class': 'col-sm-5 awayScore',
            'id': match.matchNo + 'Away'
          })
          $('.' + match.matchNo + 'updateMiddle').append(awayScore)
          var footer = $('<h2>')
          footer.attr({
            'class': 'col-sm-12 footer',
            'id': match.matchNo + 'Footer'
          })
          $('.' + match.matchNo + 'updateMiddleFooter').append(footer)
        }
        scoreDiv()
      })
    }
    if (createdDOM === true) {
      liveMatch.update.forEach(function (match) {
        var countDown
        function diffDate (date) {
          var subtract = Math.abs(new Date(date).getTime() - new Date().getTime())
          if (new Date(date).getTime() < new Date().getTime() || match.status === 'IN-PLAY') {
            countDown = 'live'
            return countDown
          }
          var diffInSec = Math.ceil(subtract / (1000))
          var newDate = new Date(null)
          newDate.setSeconds(diffInSec)
          countDown = newDate.toISOString().substr(11, 8)
        }
        diffDate(match.date)
        if (match.status === 'FINISHED') {
          countDown = 'end'
        }
        var title = match.matchNo
        $('#' + title + 'Header').text(match.status)
        $('#' + title + 'Home').text(match.result.goalsHomeTeam)
        $('#' + title + 'Away').text(match.result.goalsAwayTeam)
        $('#' + title + 'Footer').text(countDown)
      })
    } else if (liveMatch.length === [] && createdDOM === true) {
      createdDOM = false
    }
  }

  var $voteData = {
    matchInfo: this.matchInfo,
    vote: this.vote,
    token: this.token
  }
  var $dbData
  $('.modalBtn').on('click', function () {
    $dbData = $(this).data('match')
    $voteData.matchInfo = $dbData.details
    $('#homeLogo').attr('src', $dbData.homeTeam)
    $('#awayLogo').attr('src', $dbData.awayTeam)
  })
  $('#newVote').on('click', function () {
    $voteData.token = $('#token').val()
    $voteData.vote = $('input[name="team-name"]:checked').val()
    if (!$dbData.user) {
      $('.modalAlert').removeClass('hide')
      $('.modalAlert').text('You need an account to vote!')
    } else if (!$voteData.vote) {
      $('.modalAlert').removeClass('hide')
      $('.modalAlert').text('Please choose a team.')
    } else if ($dbData.user.local.tokens < $voteData.token) {
      $('.modalAlert').removeClass('hide')
      $('.modalAlert').text('Not enough tokens.')
    } else {
      $('#myModal').modal('hide')
      $.post({
        type: 'POST',
        url: '/matches/newVote',
        data: $voteData
      }).done(function (success) {
        window.location.reload()
      })
    }
  })

  $('#myCarousel').carousel({
    interval: false
  })
  $('#myCarousel').on('click', '.nav a', function () {
    $('.nav li').removeClass('active')
    $(this).parent().addClass('active')
  })

  var demoStep = 1
  $('#demoStep').on('click', function () {
    demo(demoStep)
    $('#demoStep').text('demo ' + demoStep)
    function demo (no) {
      $.ajax({
        // url: 'http://localhost:4000/api/matches/' + no,
        url: 'https://e-legal.herokuapp.com/api/matches/' + no,
        type: 'GET',
        dataType: 'json'
      }).done(function (timed) {
        $.post({
          type: 'POST',
          url: '/api/matches/demo',
          data: timed
        })
      })
      demoStep += 1
    }
  })

  $('#demoRemove').on('click', function () {
    var remove = true
    $.ajax({
      type: 'delete',
      url: '/api/matches/remove'
    }).done(function (response) {
      window.location = '/api/matches'
    })
  })
})

// // calling all team details
//   $.ajax({
//     headers: { 'X-Auth-Token': '27abe9753e3f41729df870412f174c31' },
//     url: 'https://api.football-data.org/v1/competitions/426/teams',
//     type: 'GET',
//     dataType: 'json'
//   }).done(function (teamData) {
//     $.post({
//       type: 'POST',
//       url: '/matches/teamdata',
//       data: teamData
//     })
//   })

// update previous matchdays
// $.ajax({
//   headers: { 'X-Auth-Token': '27abe9753e3f41729df870412f174c31' },
//   url: '//api.football-data.org/v1/competitions/426/fixtures?matchday=9',
//   type: 'GET',
//   dataType: 'json'
// }).done(function (timed) {
//   $.post({
//     type: 'POST',
//     url: '/matches/timed',
//     data: timed
//   })
// })

function realTime () {
  // calling timed games for next 7 days
  $.ajax({
    headers: { 'X-Auth-Token': '27abe9753e3f41729df870412f174c31' },
    url: '//api.football-data.org/v1/competitions/426/fixtures?timeFrame=n7',
    type: 'GET',
    dataType: 'json'
  }).done(function (timed) {
    $.post({
      type: 'POST',
      url: '/matches/timed',
      data: timed
    })
  })

  // calling played games one day before
  $.ajax({
    headers: { 'X-Auth-Token': '27abe9753e3f41729df870412f174c31' },
    url: '//api.football-data.org/v1/competitions/426/fixtures?timeFrame=p1',
    type: 'GET',
    dataType: 'json'
  }).done(function (finished) {
    $.post({
      type: 'POST',
      url: '/matches/finished',
      data: finished
    })
  })

  setTimeout(realTime, 10000)
}
realTime()
