import React, { useState } from "react";
import CornerstoneImage from "./CornerstoneImage";
import "./App.css";

let id = 0;

function ImageWrapper({ dicomList }) {
    const [dicomStudies, setDicomStudies] = useState([]);
    const [serieMode, setSerieMode] = useState(false);
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
    function getSerie(it)
    {
        console.log("It = ", it);
        // Sets the study corresponding
        const tmpDicomStudies = dicomList.filter(value => value.study === it.study);
        console.log("NEW SET = ", tmpDicomStudies);
        setDicomStudies(tmpDicomStudies);
        setSerieMode(!serieMode);
    }
    return (
        <div className="container w3-container w3-animate-opacity">
            <div className="row">
                {serieMode
                ?  (dicomStudies.map(it =>
                    <CornerstoneImage key={id++} dicom={it}
                        getSerie={() => getSerie(it)} />))
                : (studiesHeaders.map(it => 
                        <CornerstoneImage key={id++} dicom={it}
                            getSerie={() => getSerie(it)} />))} 
            </div>   
        </div>
    );
}

export default ImageWrapper;