import { Component } from "react";
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { getImages } from "services/getImages";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import css from './ImageGallery.module.css'

class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        error: null,
        status: 'idle'
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchText !== this.props.searchText
            || prevState.page !== this.state.page) {
            // console.log(prevProps.searchText)
            // console.log(this.props.searchText)
            // console.log('изменился запрос')

             this.setState({ status: 'pending' });

        getImages(this.props.searchText)
            .then(data => {
                if (data.hits.length === 0) {
                    Notiflix.Notify.failure('There are no images...');
                }

                return this.setState(prevState => ({
            images:
              this.state.page === 1
                ? data.hits
                : [...prevState.images, ...data.hits],
            status: 'resolved',
          }));
            })
            .catch(error => this.setState({ error, status: 'rejected' }))
        }

    };

    onLoadMore = () => {
        this.setState(prevState => {
            return { page: prevState.page + 1 }
        })
    }

    render() {
        const { images, error, status } = this.state

        if (status === 'idle') {
            return <h1>Enter something</h1>
        }

        if (status === 'pending') {
            return <Loader />
        }

        if (status === 'rejected') {
            return <div>{ error.message }</div>
        }

        if (status === 'resolved') {
            return (
                <ul className={css.imageGallery}>
                    {images.map((image) => {
                        return <ImageGalleryItem
                                key={nanoid()}
                                description={image.tags}
                                image={image}
                            />
                    })}
                {images.length > 0 && <Button onClick={this.onLoadMore} />}
                </ul>
            )
        }};
    };

export default ImageGallery;