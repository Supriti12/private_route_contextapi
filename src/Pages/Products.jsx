import React, { useEffect, useMemo, useState } from 'react';
import { Vortex } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { ProductFetch, toggleDescription } from '../Redux/Slice/ProductSlice';
import './Products.css';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const Products = () => {
  const { prod, loading } = useSelector(state => state?.ProductSlice);
  const [visible, setVisible] = useState(0);
  const limit = 3;
  let pages = Math.ceil(prod.length / 3);
  let [isShowMore,setShowMore]=useState('')

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProductFetch());
  }, [dispatch]);
  console.log("proddff",prod);

  const handleChange = e => {
    console.log('pagination', e);
    let currentPage = e.selected + 1;
    let index = (currentPage - 1) * limit;
    setVisible(index);
  };

  return (
    <div className="containerParent">
      <div className="rowItem">
        <div className="cards">
          {prod?.slice(visible, visible + limit)?.map((item, k) => {
            return (
              <div className="cardItem" key={k}>
                <div className="cardImage">
                  <img src={item.image} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="containerItem">
                  <h4>
                    <b>{item.title}</b>
                  </h4>
                  <h6>
                    <b>{item.category}</b>
                  </h6>
                 
                  {item.showDescription ? <p>{item.description}</p> :<>{item.description.slice(0,35) +'...'}</>}
                  <Link onClick={() => dispatch(toggleDescription(item.id))}>
                    {/* {item.showDescription ? '...Show Less' : 'Show More...'} */}
                    {item.showDescription ? '...Show Less' : 'Show More...'}

                  </Link>
                  <div>
                    <Link className='btn btn-success' to={`/productdetails/${item.id}`} style={{marginLeft:"6rem"}}>Details</Link>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
        <div style={{ marginLeft: '30rem' }}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handleChange}
            Displayed
            Page
            Range={5}
            pageCount={pages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
