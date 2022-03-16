var preset_values = {
    "qm22new" : {
        title : 'QM22 New',
        value : {
            'inputt' : 'CMS', 'slidert' : 100, 'sliderft' : 40,
            'inputb' : 'QM22', 'sliderb' : 120, 'sliderfb' : 40,
            'inputm' : 'NEW RESULT', 'sliderm' : 0, 'sliderfm' : 40,
            'colorpicker' : '#A51D1D',
            'type' : 1, 'effect' : 1
        }
    },
    "qm22final" : {
        title : 'QM22 Final',
        value : {
            'inputt' : 'CMS', 'slidert' : 100, 'sliderft' : 40,
            'inputb' : 'QM22', 'sliderb' : 120, 'sliderfb' : 40,
            'inputm' : 'FINAL', 'sliderm' : 0, 'sliderfm' : 43,
            'colorpicker' : '#1D34A5',
            'type' : 1, 'effect' : 1
        }
    }
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
