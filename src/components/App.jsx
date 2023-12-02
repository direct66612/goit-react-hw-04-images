import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesBySearch } from 'API/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ThreeCircles } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    imageQuery: '',
    page: 1,
    loading: false,
    error: false,
    loadMore: false,
    isShowModal: false,
    largeImageURL: '',
  };

  handleSubmit = imageName => {
    if (this.state.imageQuery === imageName) {
      return;
    }
    this.setState({
      imageQuery: imageName,
      page: 1,
      images: [],
      loadMore: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.imageQuery !== prevState.imageQuery
    ) {
      this.setState({ loading: true });
      try {
        const imagesData = await fetchImagesBySearch(
          this.state.imageQuery,
          this.state.page
        );
        if (imagesData.hits.length !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...imagesData.hits],
            loadMore: this.state.page < Math.ceil(imagesData.totalHits / 12),
          }));
        } else if (imagesData.hits.length === 0) {
          alert('No found! Please try again.');
        }
      } catch (error) {
        this.setState({ error: true, images: [] });
        alert('Please try reloading this page!');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleClick = image => {
    this.setState({
      isShowModal: true,
      largeImageURL: image.largeImageURL,
    });
  };

  handleModalClose = () => {
    this.setState({
      isShowModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const {
      images,
      imageQuery,
      loading,
      loadMore,
      isShowModal,
      largeImageURL,
    } = this.state;
    return (
      <div className="App">
        <Searchbar handleSubmit={this.handleSubmit} />

        {!imageQuery && <h2>Try to find something!</h2>}

        {loading && (
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        )}

        <ImageGallery
          items={images}
          loading={loading}
          handleClick={this.handleClick}
        />

        {images.length > 0 && loadMore && (
          <Button handleClick={this.handleLoadMore} />
        )}

        {isShowModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
