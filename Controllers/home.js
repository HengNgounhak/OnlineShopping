const User = require('../models/users');
const Product = require('../Models/products');
const Comment = require('../Models/comments');

exports.getHomePage = (req, res) => {
    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            console.log(user);
            if (user) {
                res.render('homePage', { user: user });
            } else {
                res.render('homePage', { user: null });
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.render('homePage', { user: null });
    }
}

exports.getProductDetail = (req, res) => {
    const postId = req.params.postId;

    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            if (user) {
                Product.findById(postId)
                    .then(product => {
                        res.render('productDetail', { product: product, user: user });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                // res.render('productDetail', { user: user });
            } else {
                Product.findById(postId)
                    .then(product => {
                        res.render('productDetail', { product: product, user: null });
                    })
                    .catch(err => {
                        console.log(err);
                    });
                // res.render('productDetail', { user: null });
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        Product.findById(postId)
            .then(product => {
                res.render('productDetail', { product: product, user: null });
            })
            .catch(err => {
                console.log(err);
            });
    }


}

exports.comment = (req, res) => {
    const id = req.body.user._id;
    const user = req.body.user.username;
    const dateTime = new Date().toISOString();
    const userComment = req.body.comment;

    const comment = new Comment({
        productID: id,
        dateTime: dateTime,
        userComment: userComment,
        userName: user
    });

    comment.save().then((result) => {
        console.log("add new product success");
        res.redirect('/adminPanel');
        // res.render('adminPanel');
        // res.redirect('back');
        res.json({ "data": result });
        // return res.redirect('/adminPanel');
    }).catch((err) => {
        console.log(err);
    })
}