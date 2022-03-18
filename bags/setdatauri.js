function setdatauri(link) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = link;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    var dataurl;
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        dataurl = canvas.toDataURL('image/png');
        document.getElementById('inkFilter2image').setAttribute('href', dataurl);
    }
    // document.body.appendChild(canvas);
    // document.body.removeChild(canvas);
}
