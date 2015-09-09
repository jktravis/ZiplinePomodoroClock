$(document).ready(function ()
{
    var today = new Date();
    // audio downloaded from http://oringz.com/ringtone/soft-bells/
    var audio = new Audio('https://s3-us-west-2.amazonaws.com/jktravis/74_bells-message.mp3');

    var Pomodoro = {
        breakLength: 5,
        sessionLength: 25,
        setBreak: function (m)
        {
            this.breakLength = m;
        },
        setSession: function (m)
        {
            this.sessionLength = m;
        }
    };

    var breakLength = $('#breakLength');
    var sessionLength = $('#sessionLength');

    breakLength.val(Pomodoro.breakLength);
    sessionLength.val(Pomodoro.sessionLength);

    breakLength.on('change', function(e)
    {
        console.log(breakLength.val());
    });

    today.setMinutes(today.getMinutes() + 1);
    $('#timer').countdown(today)
        .on('update.countdown', function (event)
        {
            $('#timer').text(event.strftime('%-H h %M min %S sec'));
        })
        .on('finish.countdown', function (event)
        {
            audio.play();
        });
});