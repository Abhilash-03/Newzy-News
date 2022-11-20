import React, { Component } from 'react'
import NewsItems from './NewsItems'

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
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=1&pageSize=12";
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles, totalResults : parsedData.totalResults});
    }

     handleNextPage = async()=>{
      if(this.state.page + 1 <= Math.ceil(this.state.totalResults/12) ){
        
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=${this.state.page + 1}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json();
  
        this.setState({
          page: this.state.page + 1, 
          articles: parsedData.articles,
        });
      }
      
    }

     handlePrevPage = async()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=a756d3bbb1de45318e5f2aab59b69480&page=${this.state.page - 1}&pageSize=12`;
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: parsedData.articles,
        page: this.state.page - 1, 
      });
    }

  render() {
    return (
     <div className="container my-3">
        <h2 className='my-3'>Newzy News - Top Headlines</h2>
        <div className="row" >
          {this.state.articles.map((element)=>{

           return  <div className="col-md-4 my-2" key={element.url}>
                <NewsItems title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0, 100):""} imageurl = {element.urlToImage?element.urlToImage:""} 
                newsurl = {element.url} />
            </div>
         
          })}
        </div>

         <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-outline-success btn-lg" onClick={this.handlePrevPage}>&larr; Prev</button>
          <button type="button" className="btn btn-outline-dark btn-lg" onClick={this.handleNextPage}>Next &rarr;</button>
        </div>        

     </div>

    )
  }
}

export default News
