import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

  static defaultProps = {
     country : "in",
     pageSize : 9,
     category: "general",
     totalResults: 0
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

   capitalize = (string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
   
    constructor(props){
        super(props);
        this.state = {
        articles: [],
        loading: false,
        page : 1,
        }
// {/* it will show title with category whenever I choose category*/}
        document.title = `Newzy News-${this.capitalize(this.props.category)}`; 
    }


    // fetching the news api      
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=1&pageSize=${this.props.pageSize}`;

        // this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });


    }

    // this function is used for scrolling data infinitly without using prev and next button.
    fetchMoreData = async() => {
      this.setState({page: this.state.page + 1});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
         articles: this.state.articles.concat(parsedData.articles),
         totalResults: parsedData.totalResults, 
        });

    };

  render() {
    return (
      <>
     
        <h1 className='my-3  heading'>Newzy News - Top {this.capitalize(this.props.category)} Headlines</h1>

    {/* If loading is true then show spinner  */}
        {this.state.loading && <Spinner/>} 

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
   
      <div className="container">
        <div className="row" >
          {!this.state.loading && this.state.articles.map((element)=>{

           return  <div className="col-md-4 my-2" key={element.url}>
                <NewsItems title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 100):""} imageurl = {element.urlToImage?element.urlToImage:""} 
                newsurl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
         
          })}
        </div>
      </div>
        </InfiniteScroll>

     </>
    )
  }
}

export default News
