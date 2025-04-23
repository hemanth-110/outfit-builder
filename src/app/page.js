'use client'

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import 'bootstrap/dist/css/bootstrap.min.css';
// import '@/styles/globals.css';

const clothingItems = [
  { id: "shirt1", src: "/icons/blue-shirt.png", name: "Blue Shirt" },
  { id: "shirts2", src: "/icons/black-shirt.png", name: "Black Shirt" },
  { id: "pant1", src: "/icons/black-pant.png", name: "Black Pant" },
  { id: "hat1", src: "/icons/blue-cap.png", name: "Hat 1" },
  { id: "hat2", src: "/icons/orange-cap.png", name: "Hat 2" },
];

export default function Home() {
  const [canvasItems, setCanvasItems] = useState([]);
  const [cart, setCart] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    const item = clothingItems.find((item) => item.id === id);
    const newItem = { ...item, uuid: uuidv4(), x: e.clientX, y: e.clientY };
    setCanvasItems((prev) => [...prev, newItem]);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const addToCart = () => {
    setCart([...canvasItems]);
    alert("Outfit added to cart!");
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="text-center mb-4">Outfit Builder</h1>
      <div className="row">
        <div className="col-md-3 mb-3">
          <h4>Clothing Items</h4>
          <div className="d-flex flex-wrap gap-2">
            {clothingItems.map((item) => (
              <Image
                key={item.id}
                src={item.src}
                alt={item.name}
                width={80}
                height={80}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className="border rounded p-1"
              />
            ))}
          </div>
        </div>
        <div
          className="col-md-6 mb-3 border position-relative canvas"
          style={{ height: "500px", backgroundColor: "#f8f9fa" }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <h5 className=" text-center pt-2">Virtual Canvas</h5>
          {canvasItems.map((item) => (
            <div key={item.id} className="placing-container">
              <Image
                key={item.id}
                src={item.src}
                alt={item.name}
                width={80}
                height={80}
              />
            </div>
          ))}
        </div>
        <div className="col-md-3">
          <h4>Cart</h4>
          <Button className="w-100 mb-2" onClick={addToCart}>
            Add to Cart
          </Button>
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={item.id} className="list-group-item">
                {item.name} 
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
