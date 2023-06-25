import React from "react";
import "./Card.css"
function Card({src,title,className,id}) {
  return (
  <>
    <div className={`card-columns card ${className}`} >
        <div className="card bg-light">
          <div className="card-body text-center">
              <img src={src} className="card-img"></img>
              <p className="card-title" key={"title"+id}>{title}</p>
          </div>
        </div>
        <div className="badge badge-pill card-badge">{id}</div>
    </div>
  </>
  )
}

export default Card;
