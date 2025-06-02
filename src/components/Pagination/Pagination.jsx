import { useEffect, useState } from 'react';

const page_size = 10;

const ProductCard = ({ image, title }) => {
  return (
    <div className='flex flex-col items-center'>
      <img src={image} alt={title} className='w-20 h-20' />
      <p>{title}</p>
    </div>
  );
};

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = async () => {
    const data = await fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / page_size);
  const start = currentPage * page_size;
  const end = start + page_size;

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <h1>Pagination</h1>
      <button
        style={{
          fontSize: '20px',
          cursor: 'pointer',
        }}
        onClick={() => goToPrevPage()}
        disabled={currentPage === 0}
      >
        ⬅️
      </button>
      {[...Array(noOfPages).keys()].map((n) => (
        <button
          style={{
            border: '1px solid black',
            margin: '5px',
            cursor: 'pointer',
            backgroundColor: n === currentPage ? 'cyan' : '',
          }}
          key={n}
          onClick={() => setCurrentPage(n)}
        >
          {n}
        </button>
      ))}
      <button
        style={{
          fontSize: '20px',
          cursor: 'pointer',
        }}
        onClick={() => goToNextPage()}
        disabled={currentPage === noOfPages - 1}
      >
        ➡️
      </button>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {products.slice(start, end).map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default Pagination;
