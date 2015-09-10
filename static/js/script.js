$(document).ready(function ()
{
    var SessionTimer = new (function ()
    {
        var $timer = $('.timer');
        var $sessionLength = $('#sessionLength');
        var $breakLength = $('#breakLength');
        var resumeButton = $('#btn-resume');
        var pauseButton = $('#btn-pause');
        var incrementTime = 70;
        var onBreak = false;
        var currentTime = convertMinToMilli($sessionLength.val());
        var audio = new Audio('http://www.oringz.com/oringz-uploads/74_bells-message.mp3');


        $(function ()
        {
            SessionTimer.Timer = $.timer(updateTimer, incrementTime, false);
            $timer.html(formatTime(currentTime));

            // Setup the timer
            $sessionLength.on('change', function ()
            {
                SessionTimer.resetTimer();
                $timer.text($sessionLength.val());
            });

            resumeButton.click(function ()
            {
                console.log("playing");
                SessionTimer.Timer.play();
            });

            pauseButton.click(function ()
            {
                console.log("paused");
                SessionTimer.Timer.pause();
            });

            $('#btn-reset').click(function ()
            {
                console.log('reset');
                SessionTimer.resetTimer();
            })
        });

        function updateTimer()
        {

            // Output timer position
            var timeString = formatTime(currentTime);
            $timer.html(timeString);

            // If timer is complete, trigger alert
            if (currentTime == 0)
            {
                SessionTimer.Timer.stop();
                audio.play();
                if (!onBreak)
                {
                    console.log('Break time!');
                    onBreak = true;
                    currentTime = convertMinToMilli($breakLength.val());
                    SessionTimer.Timer = $.timer(updateTimer, incrementTime, true);
                }
                else
                {
                    console.log('Work work...');
                    onBreak = false;
                    currentTime = convertMinToMilli($sessionLength.val());
                    SessionTimer.Timer = $.timer(updateTimer, incrementTime, true);
                }

                return;
            }

            // Increment timer position
            currentTime -= incrementTime;
            if (currentTime < 0) currentTime = 0;

        }

        this.resetTimer = function ()
        {

            resumeButton.removeClass('active');
            pauseButton.removeClass('active');
            $timer.text($sessionLength.val());

            // Get time from form
            var newTime = convertMinToMilli($sessionLength.val());
            if (newTime > 0)
            {
                currentTime = newTime;
            }

            // Stop and reset timer
            SessionTimer.Timer.stop().once();

        };

    });

});

// Common functions
function pad(number, length)
{
    var str = '' + number;
    while (str.length < length)
    {
        str = '0' + str;
    }
    return str;
}
function formatTime(time)
{
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);
}

function convertMinToMilli(mins)
{// convert minutes to milli-secs
    return parseInt(mins * 60 * 1000);
}
