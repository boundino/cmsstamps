var lcanvas, gg;
function w() { return lcanvas*0.8; }
function h() { return w()/4; }
function theta() { return 15; }
function stroke_width() { return 6; }
function color() { return document.getElementById('colorpicker').value; }

function draw() {
    gg = document.getElementById('g');
    lcanvas = document.getElementById('svg').clientWidth;

    drawgroup(w()/2*0.9);
    drawrect();
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
    rect.setAttribute("class", "graph group0 group1 groups");
    rect.setAttribute("transform", "rotate(-"+theta()+" "+lcanvas*0.5+","+lcanvas*0.5+")");
    gg.appendChild(rect);
}

function drawarc(R, s, id) {
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
        arc.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()*s+";");
        arc.setAttribute("id", id+"t");
        gg.appendChild(arc);

        let arc2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arc2.setAttribute("d", "M "+(lcanvas-x2)+","+(lcanvas-y2)+" A "+R+","+R+" 0 0,0 "+(lcanvas-x1)+","+(lcanvas-y1));
        arc2.setAttribute("style", "fill:transparent; stroke-width:"+stroke_width()*s+";");
        arc2.setAttribute("id", id+"b");
        gg.appendChild(arc2);

        arc.setAttribute("class", "graph groups "+id);
        arc2.setAttribute("class", "graph groups "+id);
    }
}

function drawdet(R, l, s, N, del, id) {
    var ww = w()/2, hh = h()/2,
        beta = (R*R < (ww*ww+hh*hh))?Math.acos(hh/R):Math.PI/2,
        delta = beta / N;
    for(var i=-(N-1)/2; i<=(N-1)/2; i++)
    {
        var alpha = theta()/180*Math.PI - 2*i*delta,
            x = lcanvas/2 - R*Math.sin(alpha),
            y = lcanvas/2 - R*Math.cos(alpha);
        let brick = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        brick.setAttribute("x", x-l/2);
        brick.setAttribute("y", y-s/2);
        brick.setAttribute("rx", s*0.3);
        brick.setAttribute("ry", s*0.3);
        brick.setAttribute("width", l);
        brick.setAttribute("height", s);
        brick.setAttribute("style", "stroke-width:0;");
        brick.setAttribute("class", "graphf groups "+id);
        brick.setAttribute("transform", "rotate("+(-alpha*180/Math.PI+del)+" "+x+","+y+")");
        gg.appendChild(brick);
        let brick2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        brick2.setAttribute("x", (lcanvas-x)-l/2);
        brick2.setAttribute("y", (lcanvas-y)-s/2);
        brick2.setAttribute("rx", s*0.3);
        brick2.setAttribute("ry", s*0.3);
        brick2.setAttribute("width", l);
        brick2.setAttribute("height", s);
        brick2.setAttribute("style", "stroke-width:0;");
        brick2.setAttribute("class", "graphf groups "+id);
        brick2.setAttribute("transform", "rotate("+(-alpha*180/Math.PI+del)+" "+(lcanvas-x)+","+(lcanvas-y)+")");
        gg.appendChild(brick2);
    }
}

function drawgroup(R) {
    // arc
    drawarc(R, 1.8, "group0");
    drawarc(R-stroke_width()*3, 1, "group0");
    drawarc(h()/2*1.5, 1, "group0 group1");
    drawarc((R-stroke_width()*3 + h()/2*1.5)/2, 1, "inner");
    // det
    drawdet(R, R*0.53, w()/25, 5, 6, "group1");
    drawdet(R-w()/16, (R-w()/16)*0.53, w()/40, 5, 0, "group1");
}

function setattr() {
    var tsize_t = document.getElementById('sliderft').value,
        tsize_b = document.getElementById('sliderfb').value;
    let textt = document.getElementById('textt');
    let textpt = document.getElementById('textpt');
    textpt.innerHTML = document.getElementById('inputt').value;
    textpt.style.fontSize = tsize_t + "px";
    let textb = document.getElementById('textb');
    let textpb = document.getElementById('textpb');
    textpb.innerHTML = document.getElementById('inputb').value;
    textpb.style.fontSize = tsize_b + "px";
    let textm = document.getElementById('textm');
    textm.innerHTML = document.getElementById('inputm').value;
    textm.setAttribute("x", lcanvas*0.5);
    textm.setAttribute("y", lcanvas*0.5);
    textm.setAttribute("transform", "rotate(-"+theta()+" "+lcanvas*0.5+","+lcanvas*0.5+")");
    textm.style.fontSize = document.getElementById('sliderfm').value + "px";
    let texts = document.getElementsByTagName('text');
    for(var i=0; i<texts.length; i++)
    {
        texts[i].style.fontFamily = 'sans-serif';
        texts[i].style.fontWeight = 'bold';
        texts[i].style.fill = color();
    }

    let agent = window.navigator.userAgent.toLowerCase();
    if(agent.indexOf("safari") > -1 && !window.chrome)
    {
        for(var s=-10;s<200; s++)
        {
            textpt.setAttribute("letter-spacing", s);
            var textwidth = textt.clientWidth;
            if(textwidth > ((document.getElementById('slidert').value-60)*(parseInt(tsize_t)+66.1)/120+67))
                break;
        }
        for(var s=-10;s<200; s++)
        {
            textpb.setAttribute("letter-spacing", s);
            var textwidth = textb.clientWidth;
            if(textwidth > ((document.getElementById('sliderb').value-60)*(parseInt(tsize_b)*0.71+81.85)/120+70))
                break;
        }
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
    let graphfs = document.getElementsByClassName('graphf');
    for(var i=0; i<graphfs.length; i++)
        graphfs[i].style.fill = color();

    let ieffect = document.getElementById('g');
    ieffect.style.filter = '';
    ieffect.style.mask = '';
    let ifil = document.getElementById('effect').value;
    if(ifil > 0)
    {
        if(ifil == 1 || ifil == 4)
            ieffect.style.filter = "url(#inkFilter"+ifil+")";
        else
            ieffect.style.mask = "url(#inkFilter"+ifil+")";
    }

    let groups = document.getElementsByClassName('groups');
    for(var i=0; i<groups.length; i++)
        groups[i].style.display = 'none';
    let groupdraw = 'group' + document.getElementById('type').value;
    let groupdraws = document.getElementsByClassName(groupdraw);
    for(var i=0; i<groupdraws.length; i++)
        groupdraws[i].style.display = 'block';    
    
    // seturl();
}

function changetype()
{
    document.getElementById('type').value = (parseInt(document.getElementById('type').value)+1)%2;
    setattr();
}

function changeeffect()
{
    document.getElementById('effect').value = (parseInt(document.getElementById('effect').value)+1)%5;
    setattr();
}
