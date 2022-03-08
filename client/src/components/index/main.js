import React, { useEffect, useState } from "react";
// import NavBar from "./navbar";

const Main = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartLength(cart.length+1);
    console.log(cart.length);
  };

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    const responseJSON = await response.json();
    setData(responseJSON.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div class="text-white navbar bg-base-100 mb-40 shadow-xl ">
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
                <span class="text-info">Subtotal: $999</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">Buy</button>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">icon</div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>Profile</li>

              <li>
                <button
                  onClick={() =>
                    (window.location.href = "http://localhost:3000/logout")
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
                    src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg"
                    alt={product.name}
                  />
                </figure>

                <div class="card-body bg-white ">
                  <h2 class="card-title text-black">
                    <b>{product.name}!</b>
                  </h2>
                  <p class="text-black">lorem iaasasggsag</p>

                  <div class="card-actions justify-between">
                    <h2 class="bg-white text-green-400 text-1xl">
                      <b class="text-2xl"> ${product.price}</b>{" "}
                    </h2>
                    
                    <button
                      onClick={() => addToCart(product)}
                      class="btn btn-primary"
                    >
                      Add to cart
                      <div class="indicator">

                <span class="badge badge text-white ">{cartLength}</span>
              </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Main;
