import React, { Component } from 'react'
import NewsItems from './NewsItems'

export class News extends Component {
   
    constructor(){
        super();
        this.state = {
        articles: [],
        loading: false,
        }
    }

    // fetching the news api
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=a756d3bbb1de45318e5f2aab59b69480";
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({articles: parsedData.articles});
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

     </div>

    )
  }
}

export default News
