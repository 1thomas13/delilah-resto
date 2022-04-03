import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import NavBar from "./navbar";

const Main = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  let total = 0

  const addToCart = (product) => {
    total = 0

    setCart([...cart, product]);
    setCartLength(cart.length + 1);
    console.log(cart.length);
    console.log(cart);
  };

  const getHash = ()=>{
    const url = window.location.href
    const token = url.replace("http://localhost:3001/?", "")
    return token
  }

  const [user,setUser] = useState({})

  const getUser = async () => {
    const token = getHash()
    await fetch("http://localhost:3000/users",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': '*/*'
      }
    }).then(async(response)=>{
      if(response.ok){
        const responseJSON = await response.json();
        const dataUser= {
          id:responseJSON.id,
          email:responseJSON.email,
          name:responseJSON.name
        }
        setUser(dataUser)
        console.log(responseJSON)
      }
      else{
        window.location.href = "http://localhost:3001/login"
      }
    })
    .catch((err)=>{
      console.log(err)
      window.location.href = "http://localhost:3001/login"
    })
   
    
  };

  
  const postMercadoPago = async () => {

    const token = getHash()

    await fetch("http://localhost:3000/pay/mercadopago", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({"price":total}),
    }).then(async (response) => {
      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON);
        
        window.location.href = responseJSON.response.init_point;
      }
    })
  }

  const postPaypal = async () => {

    const token = getHash()

    await fetch("http://localhost:3000/pay/paypal", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({"price":total}),
    }).then(async (response) => {
      if (response.ok) {
        const responseJSON = await response.json();
        console.log(responseJSON);
        
        window.location.href = responseJSON.response.init_point;
      }
    })
  }
  
  useEffect(() => {
    getUser();
  }, []);

  const getProducts = async () => {
    const token = getHash()
    const response = await fetch("http://localhost:3000/products",{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': '*/*'
      }
    });
    const responseJSON = await response.json();
    setData(responseJSON.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    {console.log(user)}
    {<div>
      <div class=" text-white navbar bg-base-100 mb-40 shadow-xl 
        ">
        <div class="flex-1 text-orange-400 text-xl">Delilah Restó</div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost ">
              <p class="mx-4">View cart </p>
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="badge badge text-white ">{cartLength}</span>
                
              </div>
            </label>
            
            <div
              tabindex="0"
              class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div class="card-body">
                <span class="font-bold ">{cartLength} Products</span>
                <ul>
                  {cart.map((product) => {
                    total = total+product.price
                    
                    return (<li>{product.name}</li>)
                  })}
                </ul>
                <span class="text-info">Subtotal: ${total}</span>
                <div class="card-actions">
                  <button onClick={()=>postMercadoPago()} class="btn btn-primary btn-block">
                    Buy with Mercado pago
                  </button>
                </div>
                <div class="card-actions">
                  <button onClick={()=>postPaypal()} class="btn btn-primary btn-block">
                    Buy with Paypal
                  </button>
                </div>
              </div>
            </div>
          </div>
          {user.name}
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full"><img src="https://i.imgur.com/1mGPQoP.png" alt="profile"/></div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>Profile</li>

              <li>
                <button
                  onClick={() =>
                    (window.location.href = "http://localhost:3000/login")
                  }
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="h-full bg-white">
        <h2 class=" text-center text-orange-600 text-3xl">
          Nuestros productos
        </h2>
        <div class="inline-flex justify-center bg-white flex-auto flex-wrap ">
          {data.map((product) => {
            return (
              <div
                key={product.id}
                class="card m-8 w-80 bg-base-100 shadow-lg shadow-stone-200 hover:shadow-stone-400"
              >
                <figure>
                  <img
                  class="object-cover h-60 "
                    src={product.image}
                    alt={product.name}
                  />
                </figure>

                <div class="card-body bg-white ">
                  <h2 class="card-title text-black">
                    <b>{product.name}</b>
                  </h2>
                  <br></br>
                 
                  <div class="card-actions justify-between">
                    <h2 class="bg-white text-green-400 text-1xl">
                      <b class="text-2xl"> ${product.price}</b>{" "}
                    </h2>

                    <button
                      onClick={() => addToCart(product)}
                      class="btn btn-primary"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>}
    </>
  );
};

export default Main;
