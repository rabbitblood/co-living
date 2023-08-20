//elements
const contents = document.querySelectorAll('.content');

//movement control
document.addEventListener("scroll", function (e) {
    //profile text
    for (const text of contents) {
        if (text.getClientRects()[0].top - window.innerHeight < -200 &&
            text.getClientRects()[0].bottom > 200) {
            text.style.opacity = 1;
            text.style.transform = "translateY(0)";
        } else {
            text.style.opacity = 0;
            text.style.transform = "translateY(100px)";
        }
    }
});
