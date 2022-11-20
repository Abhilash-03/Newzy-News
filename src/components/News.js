import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'

export class News extends Component {
   
    constructor(){
        super();
        this.state = {
        articles: [],
        loading: false,
        page : 1,
        }
    }

    // fetching the news api      
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=1&pageSize=${this.props.pageSize}`;

        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles, totalResults : parsedData.totalResults, loading: false});
    }

     handleNextPage = async()=>{
      if(this.state.page + 1 <= Math.ceil(this.state.totalResults/this.props.pageSize) ){
        
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
  
        this.setState({
          loading: false,
          page: this.state.page + 1, 
          articles: parsedData.articles,
        });
      }
      
    }

     handlePrevPage = async()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

      this.setState({loading: true})
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1, 
        loading: false
      });
    }

  render() {
    return (
     <div className="container my-3">
        <h1 className='my-3 text-center' style={{color:"blueviolet", backgroundColor:"black", border:"3px solid chartreuse", borderRadius:"10px"}}>Newzy News - Top Headlines</h1>

    {/* If loading is true then show spinner  */}
        {this.state.loading && <Spinner/>} 

        <div className="row" >
          {!this.state.loading && this.state.articles.map((element)=>{

           return  <div className="col-md-4 my-2" key={element.url}>
                <NewsItems title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 100):""} imageurl = {element.urlToImage?element.urlToImage:""} 
                newsurl = {element.url} />
            </div>
         
          })}
        </div>

         <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-outline-success btn-lg" onClick={this.handlePrevPage}>&larr; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-outline-dark btn-lg" onClick={this.handleNextPage}>Next &rarr;</button>
        </div>        

     </div>

    )
  }
}

export default News
