//imports
import React from "react";
import "../Css/Canal.css"
//imports

function Canal (props){
    return(
        <div className="main__canal-container">
            <div className="main__canal">
                <img className="canal-img" loading="lazy" src={props.url}></img>
            </div>
        </div>

    );
}

export default Canal;