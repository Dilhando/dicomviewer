import React, { useState, useEffect } from "react";
import ImageWrapper from "./ImageWrapper"
import * as dicomParser from "dicom-parser";

const serverAddress = "http://localhost:5000/files/";

function DicomList () {
    const [dicomList, setDicomList] = useState([]);
    const [loaded, loadingFinished] = useState(false);

    // Creates an object with the dicom data then renders when loaded
    function queryDicoms() {
        let len = 0;
        // Triggers the render
        function displayList(list) {
            if (dicomList.length === len) {
                setDicomList(list);
                loadingFinished(true);
            }
        }
        // Query at http://localhost:5000/files/ for a file list
        //  and then start a query for each file 
        let dataSet, byteArray;
        fetch(serverAddress)
            .then(response => response.text())
            .then(text => text.split(" "))
            .then(files => {
                len = files.length - 1;
                return (files.splice(0, files.length - 1)); 
            })
            .then(files =>  {
                files.map(file => fetch(serverAddress + file)
                    .then(response => response.blob())
                    .then(blob => blob.arrayBuffer())
                    .then(blob => {
                        byteArray = new Uint8Array(blob);
                        dataSet = dicomParser.parseDicom(byteArray);
                        dicomList.push({
                            fileName: serverAddress + file,
                            patientName: dataSet.string("x00100010"),
                            study: dataSet.string("x0020000d"),
                            serie: dataSet.string("x0020000e"),
                            instance: dataSet.string("x00080018")
                        });
                        return dicomList;
                    })
                    .then(list => displayList(list))
            )});        
    }
    useEffect(queryDicoms, []);
    // Sends the dicomList to ImageWrapper inside an album
    return (
        <>
        {loaded && ( 
            <div className="album py-5 bg-light">               
                <ImageWrapper dicomList={dicomList} />                   
            </div>)}
        </>
    );
}

export default DicomList;