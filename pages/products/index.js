import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/router";


function ProductsList({products}) {
    const[productList, setproductList] = useState(products);
    const router = useRouter();


    const handleSearchBar = async (e) => {
    
        const searchValue = e.target.value;

        const response1 = await fetch(`https://dummyjson.com/products/search?q=${searchValue}`);
        const data1 = await response1.json();
        setproductList(data1.products);
    }

     const dispalyProductWithId = async(productId) => {
        const response = await fetch(`https://dummyjson.com/products/productId`)
        const data = await response.json();
        setproductList(data.products)
        router.push(`/products/${productId}`,undefined,{shallow: true})
     }

    return(
        <>

           <section className="layout">
            <div className="layout-header">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            <h1>Search</h1>
            <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/top/b/r/w/s-tttp008103-tokyo-talkies-original-imagz4spyqusjjeu.jpeg?q=70"  />
            </div>
            <div className="layout-inputTag">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder="Fashionale dresses for Female" onChange={(e) => handleSearchBar(e)} />
            </div>
            <div className="layout-filter">
                <button>Sort</button>
                <button>Filter</button>
                <button>Categories</button>
            </div>
            <div className="layout-imageholder">
           {/* {products&&products.map((product) => { */}
            {productList&&productList.map((product) => {
            return(
                
              <div className="imageholder" key={product.id}>
                
                <div className="imageholder-details">
                 {/* <Image src={product.thumbnail} width="0"
                      height="0"
                      style={{ width: '100%', height: 'auto' }}/> */}
                      <Image src={product.thumbnail} width='100' height='100' />
                 <div className="name-details">{product.title}</div>
                 <div>${product.price}</div>
                </div>
                   <i className ="fa fa-plus-circle" aria-hidden="true" onClick={() => dispalyProductWithId(product.id)}></i>
                </div>
             
            );
            
           })}
        </div>
    </section> 
        </>
    )
}
export default ProductsList

export async function getServerSideProps(){
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    return{
        props:{
            products:data.products


        }
    }
}