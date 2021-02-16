const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authenController = require("../controllers/authentication");
const adminPanelController = require("../Controllers/adminPanel");

router.get('/', homeController.getHomePage);
router.get('/productDetail/:postId', homeController.getProductDetail);

router.get('/signin', authenController.signIn);
router.get('/signup', authenController.signUp);
router.post('/register', authenController.register);
router.post('/login', authenController.login);
router.post('/logout', authenController.logout);

router.get('/adminPanel', adminPanelController.adminPage);
router.post('/addProduct', adminPanelController.addProduct);
router.get('/getProduct', adminPanelController.getProduct);
router.delete('/deleteProduct/:postId', adminPanelController.deleteProduct);
router.put('/updateProduct/:postId', adminPanelController.updateProduct);
router.post('/comment', homeController.comment);

module.exports = router;