import React, { useState, useEffect, useRef } from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as dicomParser from "dicom-parser";
import { Col, Card, Button, Overlay } from "react-bootstrap";
import "./App.css";

function CSImageStudyCards({ dicom, getSeries, index }) {
    const { fileName, patientName, studyType, studyRef, studyDate, study, serie, instance } = dicom;
    const [ show, setShow ] = useState(false);
    const element = React.createRef();
    const target = useRef(element);
    
    function setImage() {
        const imageId = "wadouri:" + fileName;
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
        cornerstone.enable(element.current);
        cornerstone.loadAndCacheImage(imageId).then((image) => {
        cornerstone.displayImage(element.current, image);
            });
    }
    useEffect(setImage, []);
    return (
        <Col className="col-md-4">
            <Card className="h-100 mb-4 shadow-sm rounded">
                <div ref={element} className="dicomImage" 
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false">
                </div>
                <Card.Body className="h-100 d-flex flex-column">
                    <div className="d-flex mb-2 justify-content-between">
                        <Card.Title className="mb-0">Study {index}</Card.Title>
                    </div>
                    <Card.Text className="text-secondary">{studyRef} ({studyType})</Card.Text>
                    <div className="buttonBox">
                        <Button className="btn-outline-secondary" focusable="false" ref={target} onClick={() => setShow(!show)}>
                            View info
                        </Button>
                        <Overlay target={target.current} show={show} placement="bottom">
                            {({
                            placement,
                            scheduleUpdate,
                            arrowProps,
                            outOfBoundaries,
                            show: _show,
                            ...props
                            }) => (
                            <div
                                {...props}
                                style={{
                                backgroundColor: 'rgba(40, 40, 40, 0.85)',
                                padding: '2px 10px',
                                color: "white",
                                borderRadius: 3,
                                ...props.style,
                                }}
                            >
                                Patient name : {patientName}<br />
                                Study Date : {studyDate}<br />
                                Study Type : {studyType}<br />
                                Study Ref : {studyRef}<br />
                                Study UID : {study}<br />
                                Serie UID : {serie}<br />
                                Instance UID : {instance}<br />
                            </div>
                            )}
                        </Overlay>
                        <Button className="btn-outline-secondary"
                                onClick={() => getSeries()}>Select
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CSImageStudyCards;