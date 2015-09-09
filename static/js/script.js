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

    var timer = $('.timer');

    breakLength.val(Pomodoro.breakLength);
    sessionLength.val(Pomodoro.sessionLength);

    breakLength.on('change', function(e)
    {
        Pomodoro.setBreak(breakLength.val());
        console.log(Pomodoro.breakLength);
    });

    sessionLength.on('change', function(e)
    {
        Pomodoro.setSession(sessionLength.val());
        console.log(Pomodoro.sessionLength);
    });

    //today.setMinutes(today.getMinutes() + Pomodoro.sessionLength);

    timer.countdown(new Date().setMinutes(new Date().getMinutes() + Pomodoro.sessionLength))
        .on('update.countdown', function (event)
        {
            $('.timer').text(event.strftime('%M:%S'));
        })
        .on('finish.countdown', function (event)
        {
            audio.play();
        })
        .on('stop.countdown', function(event)
        {
            console.log("stopped");
        });

    //timer.countdown('pause');

    $('#pause').on('click', function()
    {
        timer.countdown('pause');
    });

    $('#resume').on('click', function()
    {
        timer.countdown('resume');
    });


});