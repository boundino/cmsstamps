var lcanvas, svg;
function w() { return lcanvas*0.95; }
function h() { return w()/4; }
function theta() { return 15; }
function stroke_width() { return 6; }
function color() { return document.getElementById('colorpicker').value; }
function reset() {
    document.getElementById('inputt').value = 'CMS';
    document.getElementById('inputb').value = 'QM22';
    document.getElementById('inputm').value = 'NEW RESULT';
    document.getElementById('slidert').value = '100';
    document.getElementById('sliderb').value = '120';
    document.getElementById('sliderm').value = '40';
    document.getElementById('colorpicker').value = '#A51D1D';
}

function draw() {
    svg = document.getElementById('svg');
    lcanvas = svg.clientWidth;

    drawrect();
    drawarcgroup(w()/2*0.9);
    setattr();
}

function drawrect() {
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", (lcanvas-w())*0.5);
    rect.setAttribute("y", (lcanvas-h())*0.5);
    rect.setAttribute("rx", "10");
    rect.setAttribute("ry", "10");
    rect.setAttribute("width", w());
    rect.setAttribute("height", h());
    rect.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()+";");
    rect.setAttribute("class", "graph");
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
        arc.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()+";");
        arc.setAttribute("class", "graph");
        arc.setAttribute("id", id+"t");
        svg.appendChild(arc);

        let arc2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arc2.setAttribute("d", "M "+(lcanvas-x2)+","+(lcanvas-y2)+" A "+R+","+R+" 0 0,0 "+(lcanvas-x1)+","+(lcanvas-y1));
        arc2.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()+";");
        arc2.setAttribute("class", "graph");
        arc2.setAttribute("id", id+"b");
        svg.appendChild(arc2);

        if(id !== "")
        {
            arc.style.display = "none";
            arc2.style.display = "none";
        }
    }
}

function drawarcgroup(R) {
    drawarc(R, "");
    drawarc(R-stroke_width()*0.9, "");
    drawarc(R-stroke_width()*3, "");
    drawarc((R-stroke_width()*3 + h()/2*1.5)/2, "inner");
    drawarc(h()/2*1.5, "");
}

function setattr() {
    var tsize = 40/300*w();
    let textt = document.getElementById('textt');
    let textpt = document.getElementById('textpt');
    textpt.innerHTML = document.getElementById('inputt').value;
    textpt.style.fontSize = tsize+"px";
    let textb = document.getElementById('textb');
    let textpb = document.getElementById('textpb');
    textpb.innerHTML = document.getElementById('inputb').value;
    textpb.style.fontSize = tsize+"px";
    let textm = document.getElementById('textm');
    textm.innerHTML = document.getElementById('inputm').value;
    textm.setAttribute("x", lcanvas*0.5);
    textm.setAttribute("y", lcanvas*0.5);
    textm.setAttribute("text-anchor", "middle");
    textm.setAttribute("alignment-baseline", "middle");
    textm.setAttribute("dominant-baseline", "middle"); // for firefox
    textm.setAttribute("transform", "rotate(-"+theta()+" "+lcanvas*0.5+","+lcanvas*0.5+")");
    textm.style.fontSize = document.getElementById('sliderm').value + "px";

    let agent = window.navigator.userAgent.toLowerCase();
    if(agent.indexOf("safari") > -1 && !window.chrome)
    {
        let nt = document.getElementById('inputt').value.length;
        textpt.setAttribute("letter-spacing", (document.getElementById('slidert').value-nt*tsize*0.7)/(nt-1));
        let nb = document.getElementById('inputb').value.length;
        textpb.setAttribute("letter-spacing", (document.getElementById('sliderb').value-nb*tsize*0.7)/(nb-1));
    }
    else
    {
        textt.setAttribute("textLength", document.getElementById('slidert').value); // for firefox
        textpt.setAttribute("textLength", document.getElementById('slidert').value)
        textb.setAttribute("textLength", document.getElementById('sliderb').value); // for firefox
        textpb.setAttribute("textLength", document.getElementById('sliderb').value);
    }
    
    let graphs = document.getElementsByClassName('graph');
    for(var i=0; i<graphs.length; i++)
        graphs[i].style.stroke = color();
    let texts = document.getElementsByTagName('text');
    for(var i=0; i<texts.length; i++)
    {
        texts[i].style.fontFamily = 'sans-serif';
        texts[i].style.fontWeight = 'bold';
        texts[i].style.fill = color();
    }
}

