import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props)=> {

     const [articles, setArticles] = useState([]);
     const [loading, setLoading] = useState(true);
     const [page, setPage] = useState(1);
     const [totalResults, setTotalResults] = useState(0);
// {/* it will show title with category whenever I choose category*/}

const capitalize = (string)=>{
  return string.charAt(0).toUpperCase()+string.slice(1);
}



    // fetching the news api      
    const updateNews = async()=>{
       props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);

        let data = await fetch(url);
       props.setProgress(40);

        let parsedData = await data.json();
       props.setProgress(70);

       setArticles(parsedData.articles)
       setTotalResults(parsedData.totalResults)
       setLoading(false);

       props.setProgress(100);
         

    }
 
    useEffect(() =>{
      document.title = `Newzy News-${capitalize(props.category)}`; 
      updateNews();
      //eslint-disable-next-line
    }, [])

 // this function is used for scrolling data infinitly without using prev and next button.
   const fetchMoreData = async() => {
     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
     
     setPage(page+1);
      let data = await fetch(url);
      let parsedData = await data.json();

      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
      setLoading(false);
     
    };

    return (
      <>
     
        <h1 className='my-3  heading' >Newzy News - Top {capitalize(props.category)} Headlines</h1>

    {/* If loading is true then show spinner  */}
        {loading && <Spinner/>} 

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
   
      <div className="container my-3">
        <div className="row" >
          {!loading &&  articles.map((element)=>{

           return  <div className="col-md-4 my-2" key={element.url}>
                <NewsItems title={element.title?element.title:""} description={element.description?element.description.slice(0, 100):""} imageurl = {element.urlToImage?element.urlToImage:""} 
                newsurl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
         
          })}
        </div>
      </div>
        </InfiniteScroll>

     </>
    )
}

News.defaultProps = {
  country : "in",
  pageSize : 9,
  category: "general",
  totalResults: 0
}

News.propTypes = {
 country: PropTypes.string,
 pageSize: PropTypes.number,
 category: PropTypes.string,
}

export default News
