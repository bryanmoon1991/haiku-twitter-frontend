import React, {Component} from 'react'
import HaikuCard from './HaikuCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import './Home.css'

class Home extends Component {

  state = {
    loaded: [...this.props.feed.slice(0, 9)],
    unloaded: [...this.props.feed.slice(10)],
    hasMore: true
  }

  // componentDidMount() {
  //   this.setState({
  //     loaded: [...this.props.feed.slice(0, 9)],
  //     unloaded: [...this.props.feed.slice(10)],
  //   }, ()=> console.log("in cdm of home:", this.state.loaded));
  // }
  
  

  fetchMoreData = () => {
    if(this.state.unloaded.length <= 10) {
      // this.setState({hasMore: false})
      setTimeout(() => {
        this.setState({
          loaded: [...this.state.loaded, ...this.state.unloaded],
          unloaded: [],
          hasMore: false
        });
      }, 1500);
      
    } else {
      setTimeout(() => {
        this.setState({
          loaded: [...this.state.loaded, ...this.state.unloaded.slice(0,9)],
          unloaded: [...this.state.unloaded.slice(10)]
        });
      }, 1500);
    }
  }
  

  render () {
    console.log('in home render:', this.state.loaded)
    let {currentUser, getProfile, addFavorite, removeFavorite} = this.props;
    return (
      <>
        { this.state.loaded.length > 0 ? (
          <div className="feed" id="scrollable">
          <InfiniteScroll
            dataLength={this.state.loaded.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            scrollableTarget="scrollable"
            loader={
                <h2 style={{ textAlign: 'center', backgroundColor: '#15202b' }}>Loading
                <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
                </h2>
            }
            endMessage={
              <p style={{ textAlign: 'center' , backgroundColor: '#15202b'}}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.state.loaded.map((haiku) => (
              <HaikuCard
                key={haiku.id}
                haiku={haiku}
                getProfile={getProfile}
                currentUser={currentUser}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
              
            ))}
          </InfiniteScroll>
        </div>
           ) : (
            <h2>Loading Feed</h2> 
            
         )} 
      </>
    );
    }
}

export default Home;