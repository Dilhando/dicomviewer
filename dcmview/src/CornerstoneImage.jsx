import React, { useEffect } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as dicomParser from "dicom-parser";
import "./App.css";

function CornerstoneImage({ dicom }) {
    const element = React.createRef();
    const { fileName, study, patientName } = dicom;
    function setImage() {
        const imageId = "wadouri:" + fileName;
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
        cornerstone.enable(element.current);
        cornerstone.loadAndCacheImage(imageId).then(function(image) {
        cornerstone.displayImage(element.current, image);});
    }
    useEffect(setImage, []);
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <div ref={element} className="dicomImage" 
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false">
                </div>
                <div className="card-body">
                    <p id="dicomText" className="card-text">Patient: {patientName}<br />Study: {study}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CornerstoneImage;