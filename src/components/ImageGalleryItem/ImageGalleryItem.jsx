import React from 'react';
import css from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ image, description }) => {
    const { webformatURL } = image;
    return (<li className={css.galleryItem}>
        <img src={webformatURL} alt={description} className={css.image} />
    </li>)
};

export default ImageGalleryItem;