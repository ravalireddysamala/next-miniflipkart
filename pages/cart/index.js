import Image from "next/image";
import { useState } from "react";
function Cart({cart}) {

    const[cartList, setCartList] = useState(cart);
    const deleteFromCart = async(cartId) => {
        var cartListAfterDeletion = cartList.filter((_cart) => _cart.id !== cartId);
        setCartList(cartListAfterDeletion);
    }
    return(
        <>

        {console.log("cart items is: " +JSON.stringify(cartList))}
        <section className="layout">
        <div className="layout-imageholder">
          {console.log("rending")}
          {cartList &&
            cartList.map((cart) => {
              return (
                <div className="imageholder" key={cart.id}>
                    {console.log("id in carlist is:" +JSON.stringify(cart.id))}

                  <div className="imageholder-details">
                    {/* <Image src={product.thumbnail} width="0"
                      height="0"
                      style={{ width: '100%', height: 'auto' }}/> */}
                    {/* <Image src={cart.thumbnail} width="100" height="100" /> */}
                    <div className="name-details">{cart.title}</div>
                    <div className="cart-details-alignment">${cart.price}</div>
                    <div className="cart-details-alignment">qunatity:{cart.quantity}</div>
                    <div className="cart-details-alignment">total:{cart.total}</div>
                    <div className="cart-details-alignment">discountPercentage:{cart.discountPercentage}</div>
                    <div className="cart-details-alignment">discountedPrice:{cart.discountedPrice}</div>
                  </div>
                    <button className="add-btn" onClick={() => deleteFromCart(cart.id)}>Delete</button>
                </div>
                
              );
            })}
        </div>
        </section>
        
        </>
    )
}

export default Cart;

export async function getServerSideProps(){
    const response = await fetch("https://dummyjson.com/carts/1");
    const data = await response.json();

    return {
        props:{
            cart:data.products,
        },
    };
}