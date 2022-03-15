var lcanvas, svg;
function w() { return lcanvas*0.8; }
function h() { return w()/4; }
function theta() { return 15; }
function stroke_width() { return 6; }
function color() { return "rgb(0,0,0)"; }

function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function draw() {
    svg = document.getElementById('svg');
    lcanvas = svg.clientWidth;

    drawrect();
    drawarcgroup(w()/2*0.9);
}

function drawrect() {
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", (lcanvas-w())*0.5);
    rect.setAttribute("y", (lcanvas-h())*0.5);
    rect.setAttribute("rx", "10");
    rect.setAttribute("ry", "10");
    rect.setAttribute("width", w());
    rect.setAttribute("height", h());
    rect.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()+"; stroke:"+color()+";");
    rect.setAttribute("transform", "rotate(-"+theta()+" "+lcanvas*0.5+","+lcanvas*0.5+")");
    svg.appendChild(rect);
}

function drawarc(R, id) {
    if(h()/2 < R)
        {
            var ww = w()/2, hh = h()/2, beta = (R*R < (ww*ww+hh*hh))?Math.acos(hh/R):Math.PI/2;
            var alpha1  = beta + theta()/180*Math.PI,
                alpha2 = beta - theta()/180*Math.PI;
            var x1 = lcanvas/2 - R*Math.sin(alpha1),
                y1 = lcanvas/2 - R*Math.cos(alpha1),
                x2 = lcanvas/2 + R*Math.sin(alpha2),
                y2 = lcanvas/2 - R*Math.cos(alpha2);

            let arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
            arc.setAttribute("d", "M "+x1+","+y1+" A "+R+","+R+" 0 0,1 "+x2+","+y2);
            arc.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()+"; stroke:"+color()+";");
            arc.setAttribute("id", id+"t");
            svg.appendChild(arc);

            let arc2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            arc2.setAttribute("d", "M "+(lcanvas-x2)+","+(lcanvas-y2)+" A "+R+","+R+" 0 0,0 "+(lcanvas-x1)+","+(lcanvas-y1));
            arc2.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()+"; stroke:"+color()+";");
            arc2.setAttribute("id", id+"b");
            svg.appendChild(arc2);
        }
}

function drawarcgroup(R) {
    drawarc(R, "");
    drawarc(R-stroke_width()*0.95, "");
    drawarc(R-stroke_width()*3, "inner");
    drawarc(h()/2*1.5, "");
}