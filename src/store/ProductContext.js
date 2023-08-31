import React from "react";

const mobiles = [
  {
    prodId: "1",
    title: "Mobile 1",
    price: 10000,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    RAM: "8GB",
    ROM: "128GB",
    CPU: "Snapdragon 855",
    Battery: "5000mAh",
    rear: "48MP+8MP",
    front: "20MP",
  },
  {
    prodId: "2",
    title: "Mobile 2",
    price: 25000,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    RAM: "8GB",
    ROM: "128GB",
    CPU: "Snapdragon 720G",
    Battery: "4500mAh",
    rear: "32MP+12MP",
    front: "16MP",
  },
  {
    prodId: "3",
    title: "Mobile 3",
    price: 20000,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    RAM: "4GB",
    ROM: "64GB",
    CPU: "Exynos 7878",
    Battery: "6000mAh",
    rear: "48MP+16MP+8MP",
    front: "16MP",
  },
  {
    prodId: "4",
    title: "Mobile 4",
    price: 15000,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    RAM: "8GB",
    ROM: "128GB",
    CPU: "Snapdragon 730G",
    Battery: "4500mAh",
    rear: "64MP+16MP",
    front: "32MP",
  },
];

const ProductsContext = React.createContext({
  products: [],
});

export const ProductsProvider = (props) => {
  return (
    <ProductsContext.Provider value={{ products: mobiles }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
