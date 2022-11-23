import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source} = this.props;
    return (
      <div>
        <div
          className="card"
          style={{ border: "2px solid black" }}
        >
          <div style={{
            display: 'flex', justifyContent: "flex-end", position: "absolute"
          }}>
           <span className=" badge rounded-pill bg-danger">{source} </span>
    </div>
          <img src={!imageurl?"https://wallpapercave.com/wp/wp7342177.jpg": imageurl} className="card-img-top" alt="..." height={"150px"} width={"100px"}/>
          <div className="card-body">
            <h5 className="card-title h-threedots">{title}</h5>
            <p className="card-text p-threedots">{!description?title:description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsurl}  target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
       
      </div>
    );
  }
}

export default NewsItems;
