// function for loading the products when user enters the website
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
// function for loading the products when user enters the website





// calling the function for loading the products
loadProducts();
// calling the function for loading the products






// ------------show all product in UI---------------------- 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);


  // accessing every single product from the array using for of
  for (const product of allProducts) {
    
    
   
    // creating a div to store a single product
    const div = document.createElement("div");
    div.classList.add("product");
    // creating a div to store a single product

    // setting the inner html code to the div and addding title image etc
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      
      <span>
      <h4>Ratings: ${product.rating.count}</h4>
      <h4>Average Rating:${product.rating.rate}</h4>
      </span>  
      

      <button style="background-color: #f76a7d; border:none;" onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button style="background-color: #3498db; border:none;" onclick="details(${product.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" id="details-btn" class="btn btn-danger blue-btn" >Details</button></div>
      `;
    // setting the inner html code to the div and addding title image etc




    // appendin the signle product div to the div where all products will be stored
    document.getElementById("all-products").appendChild(div);
    // appendin the signle product div to the div where all products will be stored



  }
};
// ---------------show all product in UI--------------------- 


const details = (id) =>{
  // fetching the single product url for product details
  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(data=>displayDetails(data))
  // fetching the single product url for product details

}


// function for displaying the details in a modal
const displayDetails = (data) =>{
  
  const title = document.getElementById('exampleModalLabel');
  title.innerText = data.title;
  const desc = document.getElementById('desc');
  desc.innerText = `Description: ${data.description}`
  const price = document.getElementById('modal-price');
  const priceAmount = data.price.toFixed(2)
  console.log(priceAmount);
  price.innerText = `$ ${priceAmount}`;
  const cata = document.getElementById('cata');
  cata.innerText = data.category;
  const img = document.getElementById('details-img');
  img.style.height = '200px'
  img.style.width = '200px'
  img.src = data.image;

 
  
}
// function for displaying the details in a modal



//  a count variable to store how many products have been added to the cart 
let count = 0;
//  a count variable to store how many products have been added to the cart 



// funtion for  adding the selected product to cart
const addToCart = ( id, price, ) => {
  count = count + 1;
  
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};
// funtion for  adding the selected product to cart



// function for getting the innerText of an element
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  
  let toFixed = converted.toFixed(2);
  toFixed = parseFloat(toFixed);

  
  return converted;
};
// function for getting the input value of an element


// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = (convertedOldPrice + convertPrice).toFixed(2);
  
  document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value.toFixed(2));
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  
  let grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  
  
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
