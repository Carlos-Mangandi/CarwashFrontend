
import React from 'react'
import ReactPaginate from 'react-paginate';

interface PaginationProps{
    pageCount: number;
    onPageChange: ({selected}: {selected: number}) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({pageCount, onPageChange})=>(
     <>
        <div className='flex justify-center mt-4'>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={onPageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    </>
);

export default PaginationComponent;
