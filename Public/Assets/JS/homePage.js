function cartProduct() {
    const status = document.getElementById('status').value;
    const alertToSignIn = document.getElementById('status');
    if (status == "Join") {
        $('#modelToSignIN').modal('toggle');
    } else {
        $('#modelToCart').modal('toggle');
    }
}

function getProduct() {
    axios.get('http://localhost:3000/getProduct')
        .then(products => {
            let parentElectronics = document.getElementById("electronics");
            let parentHandbacg = document.getElementById("handbacgs");
            let parentWallet = document.getElementById("wallet");
            let parentClothes = document.getElementById("clothes");
            products.data.forEach(element => {
                var discountprice = element.price - ((element.price * element.discountPrice) / 100)
                var childPost = document.createElement("div");
                childPost.setAttribute("class", "cardProduct")
                childPost.setAttribute("id", element._id);
                childPost.innerHTML = `
                <a href="http://localhost:3000/productDetail/${element._id}">
                    <div class="productImg">
                        <img src="/Assets/uploadImage/${element._id}">
                    </div>
                    <div class="productText">
                        <p>${element.detail}</p>
                    </div>
                    <div class="cardFooter">
                        <div class="price">
                            <p id="fullPrice">$${element.price}</p>
                            <p id="discountPrice">$` + discountprice.toFixed(2) + `</p>
                        </div> 
                        <div class="buyButton">
                            <a><button type="button" data-toggle="modal" onclick="cartProduct()"><i class="fas fa-shopping-cart"></i><span> Cart</span></button></a>
                        </div>
                    </div>
                    <div class="discountLogo">
                        <p>${element.discountPrice}%</p>
                    </div>
                </a>`;
                if (element.type == "Electronics") {
                    parentElectronics.appendChild(childPost);
                } else if (element.type == "Hand Bacgs") {
                    parentHandbacg.appendChild(childPost);
                } else if (element.type == "Wallet") {
                    parentWallet.appendChild(childPost);
                } else {
                    parentClothes.appendChild(childPost);
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

getProduct();