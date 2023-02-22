function LoadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data.unshift("All");
        for(var item of data)
        {
            var option = document.createElement("option");
            option.text = item.toUpperCase();
            option.value = item;
            document.getElementById("lstCategories").appendChild(option);
        }
    })
}
function LoadProducts(url){
    document.getElementById("catalog").innerHTML = "";
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        for(var item of data)
        {
            var div = document.createElement("div");
            div.className = "card p-2 m-2";
            div.style.width= "200px";
            div.innerHTML = `
              <img src=${item.image} height="150" class="card-img-top">
              <div class="card-header" style="height:160px">
                 <p>${item.title}</p>
              </div>
              <div class="card-body">
                 <dl>
                     <dt>Price</dt>
                     <dd>${item.price}</dd>
                     <dt>Rating</dt>
                     <dd>
                      <span class="bi bi-star-fill text-success"></span>
                      ${item.rating.rate} [${item.rating.count}]
                     </dd>
                 </dl>
              </div>
              <div class="card-footer">
                <button onclick="AddToCartClick(${item.id})" class="btn btn-danger w-100">
                 <span class="bi bi-cart4"></span> Add to Cart
                </button>
              </div>
            `;
            document.getElementById("catalog").appendChild(div);
        }
    })
}
function bodyload(){
    LoadCategories();
    LoadProducts("http://fakestoreapi.com/products;");
    LoadCartCount();
}
function CategoryChanged(){
    var categoryname = document.getElementById("lstCategories").value;
    if(categoryname=="All"){
        LoadProducts("http://fakestoreapi.com/products");
    } else {
        LoadProducts(`http://fakestoreapi.com/products/category/${categoryname}`);
    }
}
var cartItems = [];
function LoadCartCount(){
    document.getElementById("cartCount").innerHTML = cartItems.length;
}
function AddToCartClick(id){
    fetch(`http://fakestoreapi.com/products/${id}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        cartItems.push(data);
        LoadCartCount();
        alert(`${data.title} \n Added to Cart`);
    })
}
function ShowCartItemsClick(){
    document.querySelector("tbody").innerHTML = "";
    for(var item of cartItems)
    {
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdPreview = document.createElement("td");

        tdTitle.innerHTML = item.title;
        tdPrice.innerHTML = item.price;

        var img = document.createElement("img");
        img.src= item.image;
        img.width="50";
        img.height="50";

        tdPreview.appendChild(img);

        tr.appendChild(tdTitle);
        tr.appendChild(tdPrice);
        tr.appendChild(tdPreview);

        document.querySelector("tbody").appendChild(tr);
    }
}