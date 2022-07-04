import React from "react";
import { apiFrom2012, apiTill2012 } from "../../../../services/api";
import SpinnerContent from "../spinner/spinner";
import PaginationContent from "../pagination/pagination";

function Table(props) {
    const [dataTable, setDataTable] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [currentData, setCurrentData] = React.useState([]);
    const [spinner, setSpinner] = React.useState(false);
    const [maxPages, setMaxPages] = React.useState(0);
    const [active, setActive] = React.useState(1);

    function upload() {
        setSpinner(true);

        apiTill2012.get('/').then(response => {
            setDataTable(response.data);
        }
        ).catch(error => {
            setDataTable([]);
            console.log(error);
        }
        ).finally(() => {
            console.log('Finalizado');
        }
        )

        apiFrom2012.get('/').then(response => {
            setSpinner(false);
            setDataTable(dataTable.concat(response.data));
            setMaxPages(Math.ceil(dataTable.length / quantityPerPage));
            setCurrentData(response.data.slice((currentPage - 1) * quantityPerPage, (currentPage - 1) * quantityPerPage + quantityPerPage));
        }
        ).catch(error => {
            setDataTable([]);
            console.log(error);
        }
        ).finally(() => {
            console.log('Finalizado');
        }
        );
    }

    window.addEventListener("load", upload);

    const quantityPerPage = 10;

    function nextPage() {
        if (currentPage < Math.ceil(dataTable.length / quantityPerPage)) {
            setCurrentData(dataTable.slice((currentPage) * quantityPerPage, (currentPage) * quantityPerPage + quantityPerPage));
            setCurrentPage(currentPage + 1);
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setCurrentData(dataTable.slice((currentPage - 2) * quantityPerPage, (currentPage - 2) * quantityPerPage + quantityPerPage));
        }
    }

    const headersTable = [
        "Data",
        "Data Fim",
        "Valor"
    ];

    return (
        <>

            {spinner ? <SpinnerContent /> :
                <table className={`table table-${props.isDark ? "dark border-light" : "light border-dark"} table-striped border-top `}>
                    <thead>
                        <tr>
                            {headersTable.map((header, index) => (
                                <th scope="col" key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.data}</td>
                                <td>{row.datafim}</td>
                                <td>{row.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                    <PaginationContent active={active} isDark={props.isDark} previousPage={previousPage} nextPage={nextPage} setCurrentPage={setCurrentPage} currentPage={currentPage} maxPages={maxPages}/>
                </table>
            }
        </>

    );
}

export default Table;