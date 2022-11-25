import React from "react";

const NewsItems = (props)=> {
    let { title, description, imageurl, newsurl, author, date, source} = props;
    return (
      <div>
        <div
          className="card box-shadow"
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
            <p className="card-text">{!description?title:description}...</p>
            <p className="card-text">By -<small className="text-muted"><b> {!author?"Unknown":author}</b></small></p>
            <p className="card-text">Date:<small className="text-muted"><b> {new Date(date).toGMTString()}</b></small></p>
            <a rel="noreferrer" href={newsurl}  target="_blank" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
       
      </div>
    );
}

export default NewsItems;
