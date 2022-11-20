import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageurl, newsurl} = this.props;
    return (
      <div>
        <div
          className="card"
          style={{ width: "18rem", border: "2px solid black" }}
        >
          <img src={!imageurl?"https://wallpapercave.com/wp/wp7342177.jpg": imageurl} className="card-img-top" alt="..." height={"150px"} width={"100px"}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{!description?title:description}...</p>
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
