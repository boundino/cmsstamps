var preset_values = {
    " " : {
        title : 'Presets..',
        value : {
            'inputt' : 'CMS', 'slidert' : 105, 'sliderft' : 43,
            'inputm' : 'NEW RESULT', 'sliderm' : 0, 'sliderfm' : 40,
            'inputb' : 'TEXT 3', 'sliderb' : 150, 'sliderfb' : 40,
            'colorpicker' : '#121212',
            'type' : 2, 'effect' : 1
        }
    },
    "qm23new" : {
        title : 'QM23 New Result',
        value : {
            'inputt' : 'CMS', 'slidert' : 105, 'sliderft' : 43,
            'inputm' : 'NEW RESULT', 'sliderm' : 0, 'sliderfm' : 40,
            'inputb' : 'QM23', 'sliderb' : 136, 'sliderfb' : 43,
            'colorpicker' : '#d9534f',
            'type' : 2, 'effect' : 2
        }
    },
    "qm22final" : {
        title : 'QM23 Final Result',
        value : {
            'inputt' : 'CMS', 'slidert' : 105, 'sliderft' : 43,
            'inputm' : 'FINAL RESULT', 'sliderm' : 0, 'sliderfm' : 37,
            'inputb' : 'QM23', 'sliderb' : 136, 'sliderfb' : 43,
            'colorpicker' : '#3085b8',
            'type' : 2, 'effect' : 2
        }
    },
    "qm23data" : {
        title : 'QM23 New DATA',
        value : {
            'inputt' : 'CMS', 'slidert' : 105, 'sliderft' : 43,
            'inputm' : 'NEW DATA', 'sliderm' : 0, 'sliderfm' : 40,
            'inputb' : 'QM23', 'sliderb' : 136, 'sliderfb' : 43,
            'colorpicker' : '#d9534f',
            'type' : 2, 'effect' : 2
        }
    },
}

var setup = ['inputt', 'slidert', 'sliderft',
             'inputm', 'sliderfm',
             'inputb', 'sliderb', 'sliderfb',
             'colorpicker', 'type', 'effect'];

function listpreset() {
    let selpre = document.getElementById('presets');
    for(var key in preset_values)
    {
        let opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = preset_values[key].title;
        if(key == " ")
        {
            opt.disabled = true;
            opt.selected = true;
        }
        selpre.appendChild(opt);
    }
}

function reset() {
    let preset = document.getElementById('presets').value;
    let values = preset_values[preset].value;
    for(var key in values)
        document.getElementById(key).value = values[key];
}

function seturl() {
    const urlParams = new URLSearchParams(window.location.search);
    for(var i=0; i<setup.length; i++)
        urlParams.set(setup[i], document.getElementById(setup[i]).value);
    history.replaceState(null, null, "?" + urlParams.toString());
}

function geturl() {
    const urlParams = new URLSearchParams(window.location.search);
    for(var entry of urlParams.entries())
        if(setup.includes(entry[0]))
            document.getElementById(entry[0]).value = entry[1];
}

function copylink()
{
    const urlParams = new URLSearchParams(window.location.search);
    for(var i=0; i<setup.length; i++)
        urlParams.set(setup[i], document.getElementById(setup[i]).value);
    var str = window.location.href + "?" + urlParams.toString();
    
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    var cl = document.getElementById('dalert');
    cl.innerHTML = 'Configuration copied: <p style="text-decoration: underline;">' + str + '</p>';

    cl.style.display = 'block';
    setTimeout(function() {
        cl.style.display = 'none';
    }, 1500); // match animation 'flash'
}

function showdesc(el, text)
{
    if(window.matchMedia("(hover: hover)").matches) {
        var rect = el.getBoundingClientRect();
        var cl = document.getElementById('desc');
        cl.style.top = (rect.bottom+3) + 'px';
        cl.style.left = rect.left + 'px';
        cl.innerHTML = '<i class="fa-solid fa-arrow-up" style="font-size: 0.7rem;"></i> ' + text;
        cl.style.display = 'block';
    }
}

function rmdesc()
{
    document.getElementById('desc').style.display = 'none';
}
