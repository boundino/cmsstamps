var preset_values = {
    " " : {
        title : 'Presets..',
        value : {
            'inputt' : 'TEXT 1', 'slidert' : 145, 'sliderft' : 40,
            'inputm' : 'TEXT 2', 'sliderm' : 0, 'sliderfm' : 44,
            'inputb' : 'TEXT 3', 'sliderb' : 150, 'sliderfb' : 40,
            'colorpicker' : '#0f6ea9',
            'type' : 1, 'effect' : 1
        }
    },
    "qm22new" : {
        title : 'QM22 New',
        value : {
            'inputt' : 'CMS', 'slidert' : 100, 'sliderft' : 40,
            'inputm' : 'NEW RESULT', 'sliderm' : 0, 'sliderfm' : 40,
            'inputb' : 'QM22', 'sliderb' : 120, 'sliderfb' : 40,
            'colorpicker' : '#A51D1D',
            'type' : 1, 'effect' : 1
        }
    },
    "qm22final" : {
        title : 'QM22 Final',
        value : {
            'inputt' : 'CMS', 'slidert' : 100, 'sliderft' : 40,
            'inputm' : 'FINAL', 'sliderm' : 0, 'sliderfm' : 43,
            'inputb' : 'QM22', 'sliderb' : 120, 'sliderfb' : 40,
            'colorpicker' : '#1D34A5',
            'type' : 1, 'effect' : 1
        }
    }
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
