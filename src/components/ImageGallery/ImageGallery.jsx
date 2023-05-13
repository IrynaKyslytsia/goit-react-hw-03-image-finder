import { Component } from "react";
import { getImages } from "services/getImages";

class ImageGallery extends Component {
    state = {
        images: null
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props)
        if (prevProps.searchText !== this.props.searchText) {
            getImages(this.props.searchText)
            .then(response => response.json())
            .then(data => this.setState({images: data.hits}))
      }
    };

    render() {
        const { images } = this.state;
        return (
             <ul className="gallery">
               {images && images.map(({ id, webformatURL }) => {
                   return (
                    <li key={id} className="gallery-item">
                        <img src={webformatURL} alt={this.props.searchText} />
                    </li>
                   )
                })}
            </ul>
            
            
        )
    };
    
};

export default ImageGallery;