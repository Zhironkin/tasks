import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const Paginate = ({ count, page, current_page }) => (
   <div>
      {count && count > 1 &&
         <ReactPaginate
            containerClassName="react-pagination"
            onPageChange={e => page(e.selected)}
            pageCount={count}
            pageRangeDisplayed={2}
            forcePage={current_page}
         />
      }
   </div>
)

Paginate.propTypes = {
   count: PropTypes.number.isRequired,
   page: PropTypes.func.isRequired,
   current_page: PropTypes.number
}

export default Paginate;
