const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const uploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProducts = require('../controller/product/getCategoryProductNav')
const getCategoryWiseProduct = require('../controller/product/getCategoryProductDisplay')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const cartProductCounter = require('../controller/user/cartProductCounter')
const viewCartProducts = require('../controller/user/viewCartProducts')
const updateCartProduct = require('../controller/user/updateCartProduct')
const deleteCartProduct = require('../controller/user/deleteCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/Order&Payment/paymentController')
const webhooks = require('../controller/Order&Payment/webhook')
const orderController = require('../controller/Order&Payment/orderController')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//allUser admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

// product
router.post("/upload-product",authToken,uploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProducts)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//Cart Products
router.post("/addtocart",authToken,addToCartController)
router.get("/cartProductCounter",authToken,cartProductCounter)
router.get("/view-cart-products",authToken,viewCartProducts)
router.post("/update-cart-product",authToken,updateCartProduct)
router.post("/delete-cart-product",authToken,deleteCartProduct)

//Payment & Orders
router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhooks)
router.get("/order-list",authToken,orderController)

module.exports = router