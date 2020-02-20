import React, { useState, useEffect, useRef } from "react";
import { Button, Overlay } from "react-bootstrap";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneMath from "cornerstone-math";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";
import "./App.css";

function CSImageSingle({ dicom, viewSerie }) {
    const { fileName, patientName, studyType, studyDate, studyRef, study, serie, instance } = dicom;
    const [ show, setShow ] = useState(false);
    const element = React.createRef();
    const target = useRef(element);
    
    function setImage() {
        const imageId = "wadouri:" + fileName;
        cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
        cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
        cornerstoneTools.external.cornerstone = cornerstone;
        cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
        cornerstoneTools.external.Hammer = Hammer;
        cornerstoneTools.init();
        cornerstone.enable(element.current);
        cornerstoneTools.addTool(cornerstoneTools.ZoomMouseWheelTool);
        cornerstoneTools.addTool(cornerstoneTools.ArrowAnnotateTool);
        cornerstoneTools.setToolActive('ZoomMouseWheel', { mouseButtonMask: 1 });
        cornerstoneTools.setToolActive("ArrowAnnotate", { mouseButtonMask: 1 });
        cornerstone.enable(element.current);
        cornerstone.loadAndCacheImage(imageId).then((image) => {
        cornerstone.displayImage(element.current, image);
            });
    }
    useEffect(setImage, []);
    return (
        <div style={{ textAlign: "center", backgroundColor: "rgb(233, 236, 239)" }}>
            <div style={{ display: "inline-block", position: "relative" }}>
                <div ref={element} style={{ width: "100vw", height: "600px" }}>
                </div>
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
                        onClick={viewSerie}>
                        Back to serie
                    </Button>
                </div>
            </div>
        </div>
        
    );
}
    /*
    return (
        <Col>
            <Card className="h-100 mb-4 shadow-sm rounded">
                <div ref={element} className="dicomImage" 
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false">
                </div>
                <Card.Body className="h-100 d-flex flex-column">
                    <div className="d-flex mb-2 justify-content-between">
                        <Card.Title className="mb-0">Single</Card.Title>
                    </div>
                    <Card.Text className="text-secondary">{studyType}</Card.Text>
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
                                Study UID : {study}<br />
                                Serie UID : {serie}<br />
                                Instance UID : {instance}<br />
                            </div>
                            )}
                        </Overlay>
                        <Button className="btn-outline-secondary"
                            onClick={viewSerie}>
                            Back
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
}
*/
export default CSImageSingle;