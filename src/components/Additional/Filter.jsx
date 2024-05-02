import React from 'react'

export default function Filter(props) {
    const {array,title,call}=props
  return (
    <div className="genresbox">
              <span id="yourcat">{title}</span>
              {array.map((item) => {
                return (
                  <div className="cat">
                    <span id="genre-title" onClick={() => call(item)}>
                      {item}
                    </span>
                  </div>
                );
              })}
     </div>
  )
}
