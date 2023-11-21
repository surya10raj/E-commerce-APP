import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Shop() {
  const [menuItems, setMenuItems] = useState([]);
  const storedUser = JSON.parse(sessionStorage.getItem("user"));

  const sampleMenuItems = [
    { id: 1, name: 'Formals-Men', price: 499, image: 'Formal-Mens.jpeg', stock: 20 },
    { id: 2, name: 'Casuals-Men', price: 399, image: 'Casual-Mens.jpeg', stock: 20 },
    { id: 3, name: ' Hooded-Mens Sweater', price: 699, image: 'Hooded-Mens Sweater.jpeg', stock: 20 },
    { id: 4, name: 'Men Thermal Lined Hoodie', price: 799, image: 'Men Thermal Lined Hoodie.jpeg', stock: 20 },
    { id: 5, name: 'Mens-Blaizor', price: 599, image: 'Mens-Blaizor.jpeg', stock: 20 },
    { id: 6, name: 'white-sneaker', price: 599, image: 'white-sneaker.jpeg', stock: 20 },
    { id: 7, name: 'Men Cargo Pants', price: 599, image: 'Men Cargo Pants.jpeg', stock: 20 },
    { id: 8, name: 'Men Slant Pocket Jeans', price: 599, image: 'Men Slant Pocket Jeans.jpeg', stock: 20 },
    { id: 9, name: 'Men Collar T Shirt', price: 699, image: 'Men Collar T Shirt.jpeg', stock: 20 },
  ];
  useEffect(() => {
    // Replace this with API call to fetch menu items
    setMenuItems(sampleMenuItems);
  }, []);

  const addToCart = (item) => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser && storedUser.email) {
      if (item.stock > 0) {
        const updatedMenuItems = menuItems.map((menuItem) =>
          menuItem.id === item.id ? { ...menuItem, stock: menuItem.stock - 1 } : menuItem
        );
        setMenuItems(updatedMenuItems);

        const data = {
          ...item,
          email: storedUser.email
        };

        axios.post('http://localhost:4000/api/addToCart', data)
          .then(response => {
            console.log('Item added to cart:', response.data);
            toast.success("Added To Cart Successfully");
          })
          .catch(error => {
            console.error('Error adding item to cart:', error);
          });
      } else {
        toast.error("Item out of stock");
      }
    } else {
      console.error('User not found in session storage');
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" theme="dark" draggable autoClose={5000} />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold my-4 text-center bg-orange-950">Latest Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-gray-100 p-3 rounded-lg shadow-md">
              <center>
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="mb-4 max-h-48 max-w-xl rounded-md"
                />
                <p className="text-xl font-bold">{item.name}</p>
                <p className="text-lg">₹ {item.price}</p>
                <p className="text-sm">Stock: {item.stock}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                  disabled={item.stock === 0}
                >
                  {item.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </center>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
