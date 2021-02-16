var btnSave = document.getElementById("saveBtn");
btnSave.addEventListener("click", saveProduct);

function datepicker(id) {
    $("#" + id).datepicker().datepicker("setDate");
}

function saveProduct() {
    // axios.post('http://localhost:3000/addProduct', {
    //         name: "111",
    //         qty: 1,
    //         type: "111",
    //         date: "111",
    //         price: 1,
    //         discountPrice: 1,
    //         image: "input-files",
    //         detail: "111"
    //     })
    //     .then(result => {
    //         if (result.success = true) {
    //             console.log(result);
    //             redirect('/adminPanel');
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    const formData = new FormData(document.querySelector('form'));
    let dataToSubmit = {};
    for (var pair of formData.entries()) {
        dataToSubmit[pair[0]] = pair[1];
    }
    axios.post('http://localhost:3000/addProduct', dataToSubmit)
        .then(result => {
            console.log(result);
            // if (result.success = true) {
            //     location.replace("http://localhost:3000/adminPanel");
            // }
        }).catch(err => {
            console.log(err);
        });
}

function deleteProduct(id) {
    console.log(id);
    axios.delete('http://localhost:3000/deleteProduct/' + id)
        .then(result => {
            location.reload();
        })
        .catch(err => {
            console.log(err);
        })
}

function updateProduct(id) {
    console.log(id);
    axios.put('http://localhost:3000/updateProduct/' + id, {
            name: document.getElementById("name" + id).value,
            qty: document.getElementById("qty" + id).value,
            type: document.getElementById("type" + id).value,
            date: document.getElementById("date" + id).value,
            price: document.getElementById("price" + id).value,
            discountPrice: document.getElementById("discountPrice" + id).value,
            // imaged: document.getElementById("input-files" + id).value,
            detail: document.getElementById("detail" + id).value
        })
        .then(result => {
            if (result.success = true) {
                location.reload();
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function getProduct() {
    axios.get('http://localhost:3000/getProduct')
        .then(products => {
            // render data from server
            // console.log(posts)
            let parentPost = document.getElementById("bodyTable");
            products.data.forEach(element => {
                var childPost = document.createElement("tr");
                // childPost.setAttribute("id", element._id);
                childPost.innerHTML = `<th class="text-center" scope="row"><img src="/Assets/uploadImage/${element._id}" style="max-width:60px; max-height:60px"></th>
                <td class="align-middle">${element.name}</td>
                <td class="text-center align-middle" >${element.qty}</td>
                <td class="align-middle">${element.detail}</td>
                <td class="align-middle">${element.date}</td>
                <td class="align-middle">${element.type}</td>
                <td class="text-center align-middle" ><i class="fas fa-edit" data-toggle="modal" data-target="#edit${element._id}"></i>&nbsp;&nbsp;<i class="fas fa-trash-alt" id="${element._id}" onclick="deleteProduct(this.id)"></i></td>
                <div class="modal fade" id="edit${element._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <form action="/updateProduct/${element._id}" method="POST" enctype="multipart/form-data" class="needs-validation" novalidate>
                            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h6 class="modal-title" id="exampleModalLongTitle">Update Product</h6>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                                    </div>
                                    <div class="modal-body">

                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label class="font-weight-bold">Product Name</label>
                                                <input type="text" class="form-control form-control-sm" id="name${element._id}" value="${element.name}" placeholder="Name" name="name" required>
                                                <div class="invalid-feedback">Please fill out this field</div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="font-weight-bold">Product Qty</label>
                                                <input type="number" class="form-control form-control-sm" id="qty${element._id}" placeholder="Qty" value="${element.qty}" name="qty" required>
                                                <div class="invalid-feedback">Please fill out this field</div>
                                            </div>
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label class="font-weight-bold">Type</label>
                                                <select id="type${element._id}" class="form-control form-control-sm" name="type"  required>
                                                <option selected>${element.type}</option>
                                                <option>Clothes</option>
                                                <option>Wallet</option>
                                                <option>Hand Bacgs</option>
                                                <option>Electronics</option>
                                            </select>
                                                <div class="invalid-feedback">Please fill out this field</div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="font-weight-bold">  Date</label>                                               
                                                <input type="text" id="date${element._id}" class="form-control form-control-sm text-left mr-2" value="${element.date}" name="date" onclick="datepicker(this.id)" required />                                                   
                                                <div class="invalid-feedback">Please fill out this field</div>
                                            </div>
                                        </div>
                                        <div class="form-row mb-0">
                                            <div class="form-group col-md-6">
                                                <label class="font-weight-bold">Price($)</label>
                                                <input type="number" class="form-control form-control-sm" id="price${element._id}" placeholder="Price" value="${element.price}" name="price" required>
                                                <div class="invalid-feedback">Please fill out this field</div>
                                            </div>
                                            <div class="form-group col-md-6">
                                                <label class="font-weight-bold">Discount Price(%)</label>
                                                <input type="number" class="form-control form-control-sm" id="discountPrice${element._id}" placeholder="Discount Price(%)" min="1" max="100" value="${element.discountPrice}" name="discountPrice" required>
                                                <div class="invalid-feedback">Please fill out this field with integer number (1 to 100 only)</div>
                                            </div>
                                        </div>
                                        <!-- <div class="form-group">
                                            <label class="font-weight-bold">Product Image</label><br>                                              
                                            <label>Select a image to change old image(not required): </label>
                                            <input type="file" name="image" accept="image/png, image/jpeg" id="input-files${element._id}">
                                        </div> -->
                                        <div class="form-group">
                                            <label class="font-weight-bold">Detail</label>
                                            <input type="text" class="form-control form-control-sm" id="detail${element._id}" placeholder="Product Detail" value="${element.detail}" name="detail" required>
                                            <div class="invalid-feedback">Please fill out this field</div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary"  id="${element._id}" onclick="updateProduct(this.id)">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>`;
                parentPost.appendChild(childPost);
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

getProduct();