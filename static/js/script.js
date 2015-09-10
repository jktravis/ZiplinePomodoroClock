$(document).ready(function ()
{
    var SessionTimer = new (function ()
    {
        var $timer = $('.timer');
        var progress;
        var progressBar = $('.progress-bar');
        var $sessionLength = $('#sessionLength');
        var $breakLength = $('#breakLength');
        var resumeButton = $('#btn-resume');
        var pauseButton = $('#btn-pause');
        var incrementTime = 70;
        var onBreak = false;
        var currentTime = convertMinToMilli($sessionLength.val());
        var breakTimeAudio = new Audio('http://www.springfieldfiles.com/sounds/homer/hacker.mp3');
        var workTimeAudio = new Audio('http://www.thanatosrealms.com/war2/sounds/orcs/peon/ready.wav');


        $(function ()
        {
            SessionTimer.Timer = $.timer(updateTimer, incrementTime, false);
            $timer.html(formatTime(currentTime));

            $sessionLength.on('change', function ()
            {
                if (!onBreak)
                {
                    SessionTimer.resetTimer();
                    $timer.text($sessionLength.val());
                }
            });

            $breakLength.on('change', function ()
            {
                if (onBreak)
                {
                    SessionTimer.resetTimer();
                    $timer.text($breakLength.val());
                }
            });

            resumeButton.click(function ()
            {
                SessionTimer.Timer.play();
            });

            pauseButton.click(function ()
            {
                SessionTimer.Timer.pause();
            });

            $('#btn-reset').click(function ()
            {
                SessionTimer.resetTimer();
            })
        });

        function updateTimer()
        {

            // Output timer position
            var timeString = formatTime(currentTime);
            $timer.html(timeString);


            if (!onBreak)
            {
                progress = getProgressBarValue(currentTime, convertMinToMilli($sessionLength.val()));
            }
            else
            {
                progress = getProgressBarValue(currentTime, convertMinToMilli($breakLength.val()));
            }

            progressBar.attr('aria-valuenow', progress).css('width', progress + '%');
            $('.sr-only').text(progress + '% complete');

            // If timer is complete, trigger alert
            if (currentTime == 0)
            {
                progressBar.attr('aria-valuenow', 0).css('width', '0');
                SessionTimer.Timer.stop();


                if (!onBreak)
                {
                    breakTimeAudio.play();
                    onBreak = true;
                    currentTime = convertMinToMilli($breakLength.val());
                    SessionTimer.Timer = $.timer(updateTimer, incrementTime, true);
                    progressBar.addClass('progress-bar-danger');
                }
                else
                {
                    workTimeAudio.play();
                    onBreak = false;
                    currentTime = convertMinToMilli($sessionLength.val());
                    SessionTimer.Timer = $.timer(updateTimer, incrementTime, true);
                    progressBar.removeClass('progress-bar-danger');
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

function getProgressBarValue(current, total)
{
    return (Math.floor(100 - (current / total) * 100));

}
