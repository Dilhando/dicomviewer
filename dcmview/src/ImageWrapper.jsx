import React from "react";
import CornerstoneImage from "./CornerstoneImage";
import "./App.css";

let id = 0;

function ImageWrapper({ dicomList }) {
    // Sends back the first dicom file corresponding to each study UID
    const uniqueStudies = [...new Set(dicomList.map(item => item.study))];
    const studiesHeaders = [];
    let i = -1;
    let j = -1;
    while (uniqueStudies[++i]) {
        j = -1;
        while (dicomList[++j]) {
            if (dicomList[j].study === uniqueStudies[i]) {
                studiesHeaders.push(dicomList[j]);
                break ;    
            }
        }
    }
    return (
        <div className="container">
            <div className="row">
                {studiesHeaders.map(it => 
                <CornerstoneImage key={id++} dicom={it} />)}
            </div>   
        </div>
    );
}

export default ImageWrapper;