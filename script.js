$(document).ready(function () {
    $("#nextpage").click(() => {
        let frame = $('.active')[0];
        let src = frame.src;
        let m = /exp(\d\d)/gm.exec(src);
        console.log(frame, src, m);
        let exp = parseInt(m[1]);
        exp = (exp + 1) % 10;
        $('.active').hide('slide', { direction: 'left' }, 1000);
        //frame.classList.remove("active");
        //frame.animate({ "left": "-1000px" }, { duration: 500 }).removeClass('active');
        let nframe = document.querySelectorAll("iframe")[exp];
        nframe.classList.add("active");
        nframe.style.display = "";
    });
    $("#prevpage").click(() => {
        let frame = $('.active')[0];
        let src = frame.src;
        let m = /exp(\d\d)/gm.exec(src);
        console.log(frame, src, m);
        let exp = parseInt(m[1]);
        exp = Math.min(0, (exp - 1) % 10);
        $('.active').hide('slide', { direction: 'right' }, 1000);
        //frame.classList.remove("active");
        //frame.animate({ "left": "-1000px" }, { duration: 500 }).removeClass('active');
        let nframe = document.querySelectorAll("iframe")[exp];
        nframe.classList.add("active");
        nframe.style.display = "";
    });
});