const changePhoto = () => {
    const photos = document.querySelectorAll('.command__photo');
    photos.forEach(photo => {
        let photoSrc = photo.src;
        photo.addEventListener('mouseover', () => photo.src = photo.dataset.img);
        photo.addEventListener('mouseout', () => photo.src = photoSrc);
    })
}

export default changePhoto;