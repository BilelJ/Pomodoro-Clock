var divClone = $("#container").clone();
// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var session = true;

function startTime(n, theColor, situation) {
    var hour = 0;
    var bar = new ProgressBar.Circle(container, {
        color: theColor,
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'linear',
        duration: 60000 * n,
        text: {
            autoStyleContainer: false
        },
        from: {
            color: theColor,
            width: 4
        },
        to: {
            color: theColor,
            width: 4
        },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 60 * n);
            if (value === 0) {
                circle.setText("<center>" + (n) + ":00 " + situation + "</center>");
            } else {
                if (value % 60 == 0) {
                    circle.setText("<center>" + (n - Math.floor(value / 60)) + ":0 " + situation + "</center>");
                } else {
                    circle.setText("<center>" + (n - Math.floor(value / 60) - 1) + ":" + (60 - value % 60) + " " + situation + "</center>");
                }

            }
        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';

    bar.animate(1.0); // Number from 0.0 to 1.0
    var animation = true;
    $('#container').click(function() {
        if (animation == true) {
            bar.stop();
            animation = false;
        } else {
            bar.animate(1);
            animation = true;
        }
    });
    $('#container').bind("DOMSubtreeModified", function() {
        if (bar.value() == 1) {
            $('#container').replaceWith(divClone.clone());
            if (session) {
                session = false;
                startTime($('#break').val(), '#0080FF', 'Break');
            } else {
                session = true;
                startTime($('#session').val(), '#FF0000', 'Session');
            }
        }
    });

}

$('#start').click(function() {
    $('#container').replaceWith(divClone.clone());
    startTime($('#session').val(), '#FF0000', "Session");
    //$('#start').fadeOut("slow");
});
$('input').on('input', function() {
    if (
        $("#session").val() % 1 != 0 || $("#session").val() <= 0 ||
        $("#break").val() % 1 != 0 || $("#break").val() <= 0
    ) {
        $('#start').attr('disabled', 'disabled');
    } else {
        $('#start').removeAttr('disabled');
    }
});