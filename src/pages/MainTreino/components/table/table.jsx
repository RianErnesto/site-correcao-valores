import React, { useState } from "react";
import { apiFrom2012, apiTill2012 } from "../../../../services/api";
import SpinnerContent from "../spinner/spinner";
import ReactPaginate from "react-paginate";
import '../../../../_assets/css/pagination/pagination.css';

function Table(props) {
    const [spinner, setSpinner] = React.useState(false);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [offset, setOffset] = localStorage.getItem('currentPage') ? useState(Number(localStorage.getItem('currentPage')) * perPage) : useState(0);
    const [currentPage, setCurrentPage] = localStorage.getItem('currentPage') ? useState(Number(localStorage.getItem('currentPage'))) : useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const [postData, setPostData] = React.useState([]);

    React.useEffect(() => {
        let mounted = true;
        upload();

        return () => {
            mounted = false;
        }
    }, []);

    function upload() {
        setSpinner(true);

        apiTill2012.get('/').then(response => {

            apiFrom2012.get('/').then(res => {
                setSpinner(false);
                const data = response.data.concat(res.data);
                setData(data)
                const slice = data.slice(offset, offset + perPage);
                const postData = slice.map((item, index) => <React.Fragment>
                    <tr key={index}>
                        <td>{item.data}</td>
                        <td>{item.datafim}</td>
                        <td>{item.valor}</td>
                    </tr>
                </React.Fragment>
                );

                setPageCount(Math.ceil(data.length / perPage));
                setPostData(postData);
            }
            ).catch(error => {
                setData([]);
                console.log(error);
            }
            );
        }
        ).catch(error => {
            setData([]);
            console.log(error);
        }
        );
    }

    function handlePageClick(e) {
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        localStorage.setItem('currentPage', selectedPage);

        setCurrentPage(selectedPage);
        setOffset(offset);

        const slice = data.slice(offset, offset + perPage);
        const postData = slice.map((item, index) => <React.Fragment>
            <tr key={index}>
                <td>{item.data}</td>
                <td>{item.datafim}</td>
                <td>{item.valor}</td>
            </tr>
        </React.Fragment>
        );

        setPostData(postData);
    }

    const headersTable = [
        "Data",
        "Data Fim",
        "Valor"
    ];

    return (
        <>

            {spinner ? <SpinnerContent /> :
                <>
                    <table className={`table table-${props.isDark ? "dark border-dark" : "light border-light"} table-striped border-top `}>
                        <thead>
                            <tr>
                                {headersTable.map((header, index) => (
                                    <th scope="col" key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {postData}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel="Anterior"
                        nextLabel="Próximo"
                        breakLabel="..."
                        breakClassName="break-me"
                        pageCount={pageCount}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={`pagination-${props.isDark ? "dark" : "light"}`}
                        activeClassName="active"
                        forcePage={currentPage}
                        activeLinkClassName="active"
                        disabledClassName="disabled"
                    />
                </>
            }
        </>

    );
}

export default Table;