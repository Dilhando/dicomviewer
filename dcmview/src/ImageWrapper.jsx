import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import CSImageStudyCards from "./CSImageStudyCards";
import CSImageSerieCards from "./CSImageSerieCards";
import CSImageInstanceCards from "./CSImageInstanceCards";
import CSImageSingle from "./CSImageSingle";
import CSImageStack from "./CSImageStack";
import "./App.css";

let id = 0;

function ImageWrapper({ dicomList, seriesMode, setSeriesMode }) {
    const [ dicomSeries, setDicomSeries ] = useState([]);
    const [ dicomInstances, setDicomInstances ] = useState(null);
    const [ dicomFile, setDicomFile ] = useState({});
    const [ instanceMode, setInstanceMode ] = useState(false);
    const [ singleMode, setSingleMode] = useState(false);
    const studiesHeaders = [];
    const uniqueStudies = [...new Set(dicomList.map(item => item.study))];
    let i = -1, j;
    // Sends back in studiesHeaders the first dicom file corresponding to each study UID
    while (uniqueStudies[++i]) {
        j = -1;
        while (dicomList[++j])
            if (dicomList[j].study === uniqueStudies[i]) {
                studiesHeaders.push(dicomList[j]);
                break ;
            }
    }
    // Sets dicomSeries to be the selected serie. Triggers rerender
    function getSeries(it) {
        const tmpDicomSeries = dicomList.filter(value => value.study === it.study);
        const uniqueSeries = [...new Set(tmpDicomSeries.map(item => item.serie))];
        const seriesHeaders = []
        i = -1;
        while (uniqueSeries[++i]) {
            j = -1;
            while (tmpDicomSeries[++j])
                if (tmpDicomSeries[j].serie === uniqueSeries[i]) {
                    seriesHeaders.push(tmpDicomSeries[j]);
                    break ;
                }
        }    
        setDicomSeries(seriesHeaders);
        setInstanceMode(false);
        setSingleMode(false);
        setSeriesMode();
    }
    // Opens the selected serie and sets dicomInstances to be the corresponding instances. Triggers rerender
    function viewSerie(it) {
        const tmpDicomInstances = dicomList.filter(value => value.serie === it.serie);
        setDicomInstances(tmpDicomInstances);
        setInstanceMode(true);
        setSingleMode(false);
        setSeriesMode();
    }
    function viewSingle(it) {
        setDicomFile(it);
        setSingleMode(true);
        setSeriesMode();
    }
    // 3 levels : STUDIES ----> SERIES ----> INSTANCE / SINGLE / STACK
    // When we find "AXIAL" in the studyType parameter we can use stack tools
    i = 0;
    return (
        <>
        {seriesMode
            ?
            instanceMode
                ? 
                (singleMode
                    ?
                    <CSImageSingle dicom={dicomFile} />
                    :
                    (dicomInstances[0] && dicomInstances[0].studyType === "CT"
                        ?
                        <CSImageStack dicomList={dicomList} />
                        :
                        (<div className="album py-5 bg-light">
                            <Container>
                                <Row>
                                    {dicomInstances.map(it => 
                                    <CSImageInstanceCards key={id++} dicom={it} index={++i}
                                        viewSingle={() => viewSingle(it)} />)}
                                </Row>
                            </Container>
                        </div>)))
                :
                (<div className="album py-5 bg-light">
                    <Container>
                        <Row>
                            {dicomSeries.map(it =>
                            <CSImageSerieCards key={id++} dicom={it} index={++i}
                                viewSerie={() => viewSerie(it)} />)}
                        </Row>
                    </Container>
                </div>)
            :
            (<div className="album py-5 bg-light">
                <Container>
                    <Row>
                        {studiesHeaders.map(it => 
                        <CSImageStudyCards key={id++} dicom={it} index={++i}
                            getSeries={() => getSeries(it)} />)}
                    </Row>
                </Container>
            </div>)}
        </>
    );
}

export default ImageWrapper;