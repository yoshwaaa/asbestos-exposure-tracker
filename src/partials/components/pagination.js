import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {

    render () {
        if (this.props.totalPageCount && this.props.allStatesSelected === false) {
            return (
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.totalPageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={6}
                    onPageChange={this.props.updateFullList}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.props.paginationSelection}
                />
            );
        } else if (this.props.allStatesSelected === true) {
            return (
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.props.totalPageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={6}
                    onPageChange={this.props.updateFullList}
                    containerClassName={'pagination-full-list'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                    forcePage={this.props.paginationSelection}
                />
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

export default Pagination;