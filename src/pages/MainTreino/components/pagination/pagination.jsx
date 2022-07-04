import React from "react";
import '../../../../_assets/css/pagination/pagination.css';

function PaginationContent(props) {
    return (
        <nav className="d-flex justify-content-end">
            <ul className={`pagination custom-pagination-${props.isDark ? "dark" : "light"}`}>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous" onClick={props.previousPage}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li className={`page-item ${props.active === 1 ? "active" : null}`} aria-current="page">
                    <a className="page-link" href="#">{props.currentPage == 2 || props.currentPage == props.maxPages - 1 ? props.currentPage - 1 : props.currentPage }</a>
                </li>
                <li className={`page-item ${props.active === 2 ? "active" : null}`}>
                    <a className="page-link" href="#">{props.currentPage == 2 || props.currentPage == props.maxPages - 1 ? props.currentPage : props.currentPage + 1 }</a>
                </li>
                <li className={`page-item ${props.active === 3 ? "active" : null}`}>
                    <a className="page-link" href="#">{props.currentPage == 2 || props.currentPage == props.maxPages - 1 ? props.currentPage + 1 : props.currentPage + 2}</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next" onClick={props.nextPage}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default PaginationContent;