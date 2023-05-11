import Image from "next/image"

function StarRating({ rating }) {
    console.log("rating value is: "+rating)
    return (
      <div className="star-rating" style={{'--rating':rating}}></div>
    );
  }
  
  
function ProductDetailsWithId({product}) {

   
    return(
        <div className="layout-imageholder-product">
         <div className="imageholder-product">
                <h3>{product.title}</h3>
               
                             {/* <Image src={product.thumbnail} width="0"
                                     height="0"
                                   style={{ width: '100%', height: 'auto' }}/> */}
                   <Image src={product.thumbnail} width='200' height='300' />
                <div className="imageholder-details-product">
                    {product.images.map((image) => {
                        return(
                            <div className="image-container">
                                 <Image src={image} width='100' height='150' />
                            </div>
                        )
                    })}
                  <div>{product.title}</div>
                  <div style={{fontWeight: 'bold'}}>${product.price}</div>
                  <div>
                    {product.rating} 
                    
                    <StarRating rating={product.rating} />
                  </div>
                  <div>{product.description}</div>
                  <button className="cart-btn">Add to cart</button>
                  <button className="buy-btn">Buy Now(${product.price})</button>
                </div>
            </div>
     </div>

    )
    
}

export default ProductDetailsWithId

export async function getServerSideProps(context) {
    const { params,req,res,query } = context;
    const { productId } = params;
      console.log("params are: "+JSON.stringify(params))
    const response = await fetch(`https://dummyjson.com/products/${productId}`)
    const data = await response.json();

    return{
        props: {
            product: data,
        }
    }

}