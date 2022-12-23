//imports
import React from "react";
import "../Css/BestRank.css"
import Film from "./Film.jsx";
//imports

function BestRank (){
    return(
        <>
        <div className="bestRank-desc">
            <p>Top De Hoy </p>
        </div>
        <div className="main__bestRank">
            <Film></Film>
        </div>
        </>
    )
}

export default BestRank;