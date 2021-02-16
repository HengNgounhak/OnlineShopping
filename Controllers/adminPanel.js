const User = require('../models/users');
const Product = require('../Models/products');
const fs = require('fs');

exports.adminPage = (req, res) => {
    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            console.log(user);
            if (user) {
                if (user.isAdmin == true) {
                    res.render('adminPanel');
                } else {
                    res.render('homePage', { user: user });
                }

            } else {
                res.render('homePage', { user: null });
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.render('signIn');
    }
    // res.render('adminPanel');
}

exports.addProduct = (req, res) => {
    // upload file function
    let image;
    let uploadPath;
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // image = req.files.image;
    image = req.files.image;
    uploadPath = __dirname + '/../Public/Assets/uploadImage/' + image.name;
    console.log(image);

    // Use the mv() method to place the file somewhere on your server
    image.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);
        res.render('adminPanel');
    });
    const name = req.body.name;
    const qty = req.body.qty;
    const type = req.body.type;
    const date = req.body.date;
    const price = req.body.price;
    const discountPrice = req.body.discountPrice;
    const detail = req.body.detail;
    const product = new Product({
        name: name,
        qty: qty,
        type: type,
        date: date,
        price: price,
        discountPrice: discountPrice,
        image: image.name,
        detail: detail
    });

    product.save().then((result) => {
        console.log("add new product success");
        const oldPath = __dirname + '/../Public/Assets/uploadImage/' + result.image;
        const newPath = __dirname + '/../Public/Assets/uploadImage/' + result._id;
        fs.rename(oldPath, newPath, function(err) {
            if (err) console.log('ERROR: ' + err);
        });
        // res.redirect('/adminPanel');
        // res.render('adminPanel');
        res.json({ "success": true });
        // return res.redirect('/adminPanel');
    }).catch((err) => {
        console.log(err);
    })
}

exports.getProduct = (req, res) => {
    //get todo
    Product.find()
        .then(posts => {
            // console.log(posts);
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deleteProduct = (req, res) => {
    //delete todo
    const postId = req.params.postId;

    Product.findByIdAndRemove(postId)
        .then((product) => {
            const path = __dirname + '/../Public/Assets/uploadImage/' + product._id;
            try {
                fs.unlinkSync(path)
                    //file removed
            } catch (err) {
                console.error(err)
            }
            console.log('Product is deleted');
            res.json({ "message": "success" });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.updateProduct = (req, res) => {
    const postId = req.params.postId;
    const name = req.body.name;
    const qty = req.body.qty;
    const type = req.body.type;
    const date = req.body.date;
    const price = req.body.price;
    const discountPrice = req.body.discountPrice;
    // const myImage = req.body.imaged;
    const detail = req.body.detail;

    Product.findByIdAndUpdate(postId)
        .then((product) => {
            // if (myImage != "") {
            //     const oldImage = product.image;
            //     const path = __dirname + '/../Public/Assets/uploadImage/' + oldImage;
            //     try {
            //         fs.unlinkSync(path)
            //             //file removed
            //     } catch (err) {
            //         console.error(err)
            //     }
            //     let newImage;
            //     let uploadPath;
            //     newImage = req.files.image;
            //     // console.log(newImage);
            //     uploadPath = __dirname + '/../Public/Assets/uploadImage/' + newImage.name;
            //     console.log(image);

            //     // Use the mv() method to place the file somewhere on your server
            //     newImage.mv(uploadPath, function(err) {
            //         if (err) return res.status(500).send(err);
            //         // res.render('adminPanel');
            //     });
            //     product.image = newImage.name;
            // }
            product.name = name;
            product.qty = qty;
            product.type = type;
            product.date = date;
            product.price = price;
            product.discountPrice = discountPrice;
            product.detail = detail;
            console.log('Product is updated');
            res.json({ success: true });
            return product.save();
        })
        .catch(err => {
            console.log(err);
        })
}