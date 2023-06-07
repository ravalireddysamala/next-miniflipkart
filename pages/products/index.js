import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

function ProductsList({ products }) {
  const [productList, setproductList] = useState(products);
  const router = useRouter();
  const [visibleFilter, setVisibleFilter] = useState(false);
  const[counter, setCounter] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [visibleAddToCartForm, setVisibleAddToCartForm] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    brand: "",
  });

  const handleSearchBar = async (e) => {
    const searchValue = e.target.value;

    const response1 = await fetch(
      `https://dummyjson.com/products/search?q=${searchValue}`
    );
    const data1 = await response1.json();
    setproductList(data1.products);
  };

  const displayProductWithId = async (productId) => {
    const response = await fetch(`https://dummyjson.com/products/productId`);
    const data = await response.json();
    setproductList(data.products);
    router.push(`/products/${productId}`, undefined, { shallow: true });
  };

  const displayFilter = async () => {
    setVisibleFilter(!visibleFilter);
  };

  const addToCartPage = async () => {
    router.push(`/cart`, undefined, { shallow: true });
  };

  const addProductToCart = async (product) => {
    setCounter(counter + 1);
    console.log("counter value is: " +counter);
    const response = await fetch("https://dummyjson.com/carts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        products: [
            {
              id: product.id,
              quantity: product.quantity,
            },
          ]
      }),
    }).then(res => res.json())
    .then(console.log);


  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:9000/profile", {
//       method: "POST",
//       body: JSON.stringify({ product }),
//       headers: {
//         "content-Type": "application/json",
//       },
//     });
//     product.id = new Date().getTime();
//     const data = product;
//     setproductList((productList) => [...productList, data]);
//     console.log(data);
//   };

//   const handleChange = async (event) => {
//     const { name, value } = event.target;
//     setProduct((product) => ({
//       ...product,
//       [name]: value,
//     }));
//   };

  return (
    <>
      <section className="layout">
        <div className="layout-header">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          <h1>Search</h1>
          {/* <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/top/b/r/w/s-tttp008103-tokyo-talkies-original-imagz4spyqusjjeu.jpeg?q=70" /> */}
          <i className="fa fa-shopping-cart" onClick={addToCartPage}>
            <span>{counter}</span>
          </i>
        </div>
        <div className="layout-inputTag">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Fashionale dresses for Female"
            onChange={(e) => handleSearchBar(e)}
          />
        </div>
        <div className="layout-filter">
          <button>Sort</button>
          <button onClick={displayFilter}>Filter</button>
          <button>Categories</button>
        </div>
        <div className="layout-imageholder">
          {console.log("rending")}
          {/* {products&&products.map((product) => { */}
          {productList &&
            productList.map((product) => {
              return (
                <div className="imageholder" key={product.id}>
                  <div className="imageholder-details">
                    {/* <Image src={product.thumbnail} width="0"
                      height="0"
                      style={{ width: '100%', height: 'auto' }}/> */}
                    <Image src={product.thumbnail} width="100" height="100" />
                    <div className="name-details">{product.title}</div>
                    <div>${product.price}</div>
                  </div>
                  <i
                    className="fa fa-plus-circle"
                    aria-hidden="true"
                    onClick={() => displayProductWithId(product.id)}
                  ></i>
                  <div>
                    <button
                      className="add-btn"
                      onClick={() => addProductToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <div>
          <button>Add Product</button>

          <div className="create">
            <form onSubmit={handleSubmit}>
              <label>title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
              />
              <label>price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
              <label>description</label>
              <input
                type="text"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
              <label>brand</label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
              {!isPending && <button>Add</button>}
              {isPending && <button disabled>adding...</button>}
            </form>
          </div>
        </div> */}
      </section>
    </>
  );
}
export default ProductsList;

export async function getServerSideProps() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  return {
    props: {
      products: data.products,
    },
  };
}

/*
     {visibleFilter ? (
          <div className="brand-layout">
            <h4>Brand</h4>
            <div className="single-brand-layout">
              <input type="checkbox" />
              <span>Apple</span>
            </div>
            <div className="single-brand-layout">
              <input type="checkbox" />
              <span>Samsung</span>
            </div>
            <div className="single-brand-layout">
              <input type="checkbox" />
              <span>OPPO</span>
            </div>
            <div className="single-brand-layout">
              <input type="checkbox" />
              <span>Huawei</span>
            </div>
          </div>
        ) : null}
*/
