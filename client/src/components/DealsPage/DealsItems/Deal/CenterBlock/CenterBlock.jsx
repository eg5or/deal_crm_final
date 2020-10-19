import React, {useState} from "react";
import classes from "../deal.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddFile from "../Add/AddFile";
import CenterBlockItems from "./CenterBlockItems";

const CenterBlock = ({
                         clientInvoices,
                         providerInvoices,
                         allDocs,
                         allCompanies,
                         saveFile,
                         id,
                         managerId,
                         loading,
                         position,
                         dealDone,
                         deleteFile,
                         sumClientInvoices,
                         sumProviderInvoices,
                         sumAllDocs
}) => {
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка счетов для клиента
    let clientInvoicesElements = clientInvoices.map(clientInvoice => <CenterBlockItems
        key={clientInvoice._id}
        company={clientInvoice.company}
        fileUrl={clientInvoice.fileUrl}
        sum={clientInvoice.sum}
        typeFile={clientInvoice.typeFile}
        dealId={id}
        deleteFile={deleteFile}
        position={position}
        dealDone={dealDone}
        managerId={managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка счетов поставщиков
    let providerInvoicesElements = providerInvoices.map(providerInvoice => <CenterBlockItems
        key={providerInvoice.id}
        company={providerInvoice.company}
        fileUrl={providerInvoice.fileUrl}
        sum={providerInvoice.sum}
        typeFile={providerInvoice.typeFile}
        dealId={id}
        deleteFile={deleteFile}
        position={position}
        dealDone={dealDone}
        managerId={managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // отрисовка документов
    let docsElements = allDocs.map(doc => <CenterBlockItems key={doc.id}
                                                                  company={doc.company}
                                                                  fileUrl={doc.fileUrl}
                                                                  sum={doc.sum}
                                                                  typeFile={doc.typeFile}
                                                                  dealId={id}
                                                                  deleteFile={deleteFile}
                                                                  position={position}
                                                                  dealDone={dealDone}
                                                                  managerId={managerId}
    />)
    // -----------------------------------------------------------------------------------------------------------------
    // окно ADD FILE
    // локальный стэйт
    const [openAddFile, setOpenAddFile] = React.useState(false);
    let [typeFile, setTypeFile] = useState('')
    // открыть для ClientInvoices
    const onAddFileOpenCI = () => {
        setOpenAddFile(true)
        setTypeFile('CI')
    }
    // открыть для ProviderInvoices
    const onAddFileOpenPI = () => {
        setOpenAddFile(true)
        setTypeFile('PI')
    }
    // открыть для AllDocs
    const onAddFileOpenDOC = () => {
        setOpenAddFile(true)
        setTypeFile('DOC')
    }
    // -----------------------------------------------------------------------------------------------------------------
    return (
        <>
            {/*----------------------начало-------------------ОКНО ADD FILE------------------------------------------*/}
            <AddFile allCompanies={allCompanies}
                     openAddFile={openAddFile}
                     setOpenAddFile={setOpenAddFile}
                     typeFile={typeFile}
                     setTypeFile={setTypeFile}
                     saveFile={saveFile}
                     id={id}
                     managerId={managerId}
            />
            {/*----------------------конец--------------------ОКНО ADD FILE------------------------------------------*/}
            <div className={classes.centerBlock}>
                <div className={classes.clientInvoices}>
                    <div className={classes.headerClientInvoices}>
                        <div className={classes.titleClientInvoices}>счета клиенту</div>
                        {loading.fileCI &&
                        <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                        <div className={classes.sumClientInvoices}>{sumClientInvoices.toLocaleString()} ₽</div>
                    </div>
                    <div className={classes.docsFilesItems}>
                        {clientInvoicesElements}
                        {(position === 'manager' || position === 'chief') && !dealDone &&
                        <div className={classes.addFile} onClick={onAddFileOpenCI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
                <div className={classes.providerInvoices}>
                    <div className={classes.headerProviderInvoices}>
                        <div className={classes.titleProviderInvoices}>счета поставщиков</div>
                        {loading.filePI &&
                        <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                        <div className={classes.sumProviderInvoices}>{sumProviderInvoices.toLocaleString()} ₽</div>
                    </div>
                    <div className={classes.docsFilesItems}>
                        {providerInvoicesElements}
                        {(position === 'manager' || position === 'chief') && !dealDone &&
                        <div className={classes.addFile} onClick={onAddFileOpenPI}>
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
                <div className={classes.allDocs}>
                    <div className={classes.headerAllDoc}>
                        <div className={classes.titleAllDoc}>документы</div>
                        {loading.fileDOC &&
                        <div className={classes.loading}><CircularProgress color="secondary" size={20}/></div>}
                        <div className={classes.sumAllDocs}>{sumAllDocs.toLocaleString()} ₽</div>
                    </div>
                    <div className={classes.docsFilesItems}>
                        {docsElements}
                        {(position === 'manager' || position === 'chief' || position === 'secretary') && <div
                            className={classes.addFile}
                            onClick={onAddFileOpenDOC}
                        >
                            <div className={classes.plus}>+</div>
                            <div className={classes.addFileText}>Добавить<br/>файл</div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CenterBlock;