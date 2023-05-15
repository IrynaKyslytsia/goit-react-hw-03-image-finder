import { Component } from "react";
import Notiflix from 'notiflix';
import { getImages } from "services/getImages";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Loader from "components/Loader/Loader";
import Button from "components/Button/Button";
import css from './ImageGallery.module.css'

class ImageGallery extends Component {
    state = {
        images: [],
        // isLoading: false,
        error: '',
        status: 'idle',
        page: 1
    };

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props)
        if (prevProps.searchText !== this.props.searchText) {
            this.setState({status: 'pending'})
            getImages(this.props.searchText, this.state.page)
                .then(response => response.json())
                .then(data => {
                    this.setState(prevState => ({
                        images: this.state.page === 1
                            ? data.hits
                            : [...prevState.images, data.hits],
                        status: 'resolved'
                    }))
                })
                .catch((error) => {this.setState({error, status: 'rejected'})})
                // .finally(() => {this.setState({isLoading: false})})
      }
    };

    onLoadMore = () => {
        this.setState(prevState => {
            return { page: prevState.page + 1 }
        })
    };

    render() {
        const { images } = this.state;
        if (this.state.status === 'pending') return <Loader />
        else if (this.state.status === 'resolved') return (
            <ul className={css.imageGallery}>
               {images.map((image) => {
                   return <ImageGalleryItem
                       key={image.id}
                       description={this.props.searchText}
                       image={image}
                    //    onClick={}

                   />
               })}
                {images.length > 0 && <Button onClick={this.onLoadMore} />}
            </ul>
        )
        else if (this.state.status === 'rejected') return Notiflix.Notify.failure('Oops... Something went wrong!');
        };
    };

export default ImageGallery;