import React, {useState} from "react";
import {Document, Page} from "react-pdf/dist/umd/entry.webpack";
import classes from "./printItem.module.css"
import config from '../../../../../config/config.json'

const PrintItem = ({fileUrl}) => {
    // -----------------------------------------------------------------------------------------------------------------
    // PDF Viewer
    const [numPages, setNumPages] = useState(null);
    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
    }
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <>
            {fileUrl.split('.')[1] === 'pdf'
                ? <Document
                file={`${config.baseUrl}/uploads/${fileUrl}`}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page
                    pageNumber={1}
                    width={900}
                />
            </Document>
                :  <div className={`${classes.image}`}>
                <img alt='' src={`${config.baseUrl}/uploads/${fileUrl}`}/>
            </div>}
            <div className={classes.pageBreak} />
        </>
    )
}

export default PrintItem;