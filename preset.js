var preset_values = {
    "qm22new" : {
        title : 'QM22 New',
        value : {
            'inputt' : 'CMS',
            'inputb' : 'QM22',
            'inputm' : 'NEW RESULT',
            'slidert' : '100',
            'sliderb' : '120',
            'sliderm' : '40',
            'colorpicker' : '#A51D1D',
            'type' : 1,
            'effect' : 1
        }
    },
    "qm22final" : {
        title : 'QM22 Final',
        value : {
            'inputt' : 'CMS',
            'inputb' : 'QM22',
            'inputm' : 'FINAL',
            'slidert' : '100',
            'sliderb' : '120',
            'sliderm' : '43',
            'colorpicker' : '#1D34A5',
            'type' : 1,
            'effect' : 1,
        }
    },
}

function listpreset() {
    let selpre = document.getElementById('presets');
    for(var key in preset_values)
    {
        let opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = preset_values[key].title;
        selpre.appendChild(opt);
    }
}

function reset() {
    let preset = document.getElementById('presets').value;
    let values = preset_values[preset].value;
    for(var key in values)
        document.getElementById(key).value = values[key];
}
