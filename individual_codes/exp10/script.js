$(document).ready(function () {
    $('#hide').click(() => {
        let box = $('.box')[0];
        if (box.classList.contains('hidden')) {
            box.classList.remove("hidden");
        } else {
            box.classList.add('hidden');
        }
    });
    $("#hover").mouseover(() => {
        alert("Hovered");
    });
    $("#up").click(() => {
        let text = $("#up").text();
        if (text === "Slide Up") {
            $("#slide").slideUp();
            $("#up").text("Slide Down");
        }
        else {
            $("#slide").slideDown();
            $("#up").text("Slide Up");
        }
    });
})