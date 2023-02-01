const uploadBox = document.querySelector('.upload_box'),
    previewImg = uploadBox.querySelector('img'),
    widthInput = document.querySelector('.width input'),
    heightInput = document.querySelector('.height input'),
    ratioInput = document.querySelector('.ratio input'),
    qualityInput = document.querySelector('.quality input'),
    fileUpload = uploadBox.querySelector('input[type="file"]'),
    downloadBtn = document.querySelector('.download_btn');

let ogImageRatio;

const loadFile = (event) => {
    const file = event.target.files[0]
    if(!file) return;

    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => {
        widthInput.value = previewImg.clientWidth;
        heightInput.value = previewImg.clientHeight;
        ogImageRatio = previewImg.clientWidth / previewImg.clientHeight;
        document.querySelector('.wrapper').classList.add('active')
    })
}

widthInput.addEventListener('keyup', () => {
   const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
   heightInput.value = Math.floor(height);
});

heightInput.addEventListener('keyup', () => {
   const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
   widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx = canvas.getContext('2d');

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    a.href = canvas.toDataURL('image/jpeg', imgQuality);
    a.download = new Date().getTime();
    a.click();
}

downloadBtn.addEventListener('click', resizeAndDownload);

fileUpload.addEventListener('change', loadFile);

uploadBox.addEventListener('click', () =>  fileUpload.click())
