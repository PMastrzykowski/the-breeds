import React from 'react';
import { connect } from 'react-redux';
import { setBreeds, loadBreedImages } from '../actions/breeds';
import { openModal } from '../actions/modal';
import Modal from './Modal';
import Select from './Select';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: window.scrollY,
      width: window.innerWidth,
      height: window.innerHeight,
      itemHeight: 100
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.calculateStyle = this.calculateStyle.bind(this);
    this.renderBreeds = this.renderBreeds.bind(this);
    this.renderModalImages = this.renderModalImages.bind(this);
  }

  componentDidMount = () => {
    this.props.setBreeds();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateDimensions);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateDimensions);
  };

  handleScroll = () => {
    this.setState({
      scrollY: window.scrollY
    })
  };
  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  calculateStyle = (position) => {
    if (this.state.width + this.state.height < 1500) {
      return {}
    }
    let result = {
      'transform': `perspective(300px) rotate3d(1,0,0,${(this.state.scrollY - (position * this.state.itemHeight)) * 0.04}deg) 
      translateZ(${this.state.height / 2 - Math.abs(this.state.scrollY - position * this.state.itemHeight) > 0 ? (this.state.height / 2 - Math.abs(this.state.scrollY - position * this.state.itemHeight)) * 0.15 : 0}px)
      ` }
    return result
  }
  renderBreeds = () => {
    switch (true) {
      case this.props.errors.breedsError !== '':
        return <div className='error'>We couldn't reach the breeds! :( Please check your Internet connection or try again later.</div>
      case this.props.breeds.isLoading:
        return <div className='loader' />
      default:
        return <div className='all-breeds'>
          {this.props.breeds.allBreeds.map((breed, breedIndex) =>
            <div className='breed' key={breedIndex}>
              <div
                className='breed-name'
                onClick={() => this.props.openModal({ breed: breed.name, numberOfImages: this.props.modal.numberOfImages })}
                style={this.calculateStyle(breed.position)}
              >
                {breed.name}
              </div>
              {breed.subBreeds.map((subBreed, subBreedIndex) =>
                <div
                  key={subBreedIndex}
                  style={this.calculateStyle(breed.position + subBreedIndex + 1)}
                  onClick={() => this.props.openModal({ breed: breed.name, numberOfImages: this.props.modal.numberOfImages })}
                  className='breed-subbreed breed-name'>
                  {subBreed}
                </div>)}
            </div>)}
        </div>
    }
  }
  renderModalImages = () => {
    switch (true) {
      case this.props.errors.breedImagesError !== '':
        return <div className='error'>We couldn't reach the picures! :( Please check your Internet connection or try again later.</div>
      case this.props.modal.isLoading:
        return <div className='loader' />
      default:
        return this.props.modal.images.map((image, index) => <img src={image} key={index} alt={`Dog ${index}`} />)
    }
  }
  render = () => {
    return (
      <>
        <div className='title'>
          <img src='./breeds.svg' alt='The Breeds logo' />
        </div>
        {this.renderBreeds()}
        <div className='scroll-shadow top' />
        <div className='scroll-shadow bottom' />
        <Modal>
          <div id='modal-content'>
            <div className='title'>
              <div>{this.props.modal.breed}</div>
              <div className='subtitle'>Display <Select
                selected={this.props.modal.numberOfImages}
                onChange={(numberOfImages) => this.props.loadBreedImages({ breed: this.props.modal.breed, numberOfImages })} /> photos.
              </div>
            </div>
            <div className='images'>
              {this.renderModalImages()}
            </div>
          </div>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  breeds: state.breeds,
  modal: state.modal,
  errors: state.errors
})
const mapDispatchToProps = {
  setBreeds,
  openModal,
  loadBreedImages
};
export default connect(mapStateToProps, mapDispatchToProps)(App);