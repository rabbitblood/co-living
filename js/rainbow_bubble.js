//canvas part
document.querySelector("body").innerHTML += '<canvas \
                                            id="bubble" \
                                            style="position:fixed; top:0; left:0; height:100vh;width:100vw;pointer-events: none;">\
                                            </canvas>';

const canvas = document.querySelector("#bubble");
let canvas_circles = [];
const r = function () { return Math.random(); }
const plusOrMinus = function () { return Math.random() < 0.5 ? -1 : 1; }
const c = canvas.getContext("2d");
let mouse_pos_x;
let mouse_pos_y;


init();

function init() {
    setTimeout(function () {
        init_canvas();
    }, 100)
    animate();
}

addEventListener("mousemove", (e) => {
    mouse_pos_x = e.clientX;
    mouse_pos_y = e.clientY;


    let current_arc = new circle();
    current_arc.instantiate(mouse_pos_x, mouse_pos_y);
    canvas_circles.push(current_arc);
});

/*-------------------------------------------------Canvas---------------------------------------------------*/
function init_canvas() {
    var body = document.body,
        html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);

    canvas.width = document.body.offsetWidth;
    canvas.height = html.clientHeight;
}

function animate() {

    requestAnimationFrame(animate)
    {
        c.clearRect(0, 0, canvas.width, canvas.height);

        for (const cir of canvas_circles) {
            cir.move();
        }
    }
}

function circle() {
    this.move_duration = 1000;
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.arc_instance = null;
    this.v_x = 0;
    this.v_y = 0;
    this.destination_x = 0;
    this.destination_y = 0;
    this.start_time = 0;
    this.lastUpdate = 0;
    this.last_destination_x = 0;
    this.last_destination_y = 0;
    this.color = "";


    this.instantiate = function (x, y) {
        this.x = x;
        this.y = y;
        this.last_destination_x = this.x;
        this.last_destination_y = this.y;
        this.radius = r() * 30;

        this.start_time = Date.now();
        this.lastUpdate = Date.now();
        this.set_new_destination();
        this.move()
        this.color = `rgba(${r() * 255},${r() * 0},${r() * 255},${1})`;
    }

    this.move = function () {
        if ((this.lastUpdate - this.start_time) > this.move_duration) {
            for (let i = 0; i < canvas_circles.length - 1; i++) {
                if (canvas_circles[i] == this) {
                    canvas_circles.splice(i, 1);
                    break;
                }
            }
            return;
        }

        var now = Date.now();
        var dt = now - this.lastUpdate;
        this.lastUpdate = now;

        this.x = this.x + (this.v_x);
        this.y = this.y + (this.v_y);

        c.beginPath();
        c.strokeStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.stroke();
    }

    this.set_new_destination = function () {
        this.v_x = r() * 1 * plusOrMinus();
        this.v_y = -(r() * 3);
    }
}