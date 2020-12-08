
const Product = require('../models/product');

exports.getAddProductPage =  (req,res,next) => {
  res.render('Admin/edit-product',{pageTitle:"Add Product" , path: "/admin/add-product" , editMode : false,user: req.session.user})};

exports.postAddProductPage = (req, res, next) => {
   const body = req.body;
   const product = new Product({
      title: body.prodName,
      imageUrl: body.prodImageUrl,
      description: body.prodDescription,
      price: body.prodPrice,
      year: body.prodSeason,
      userId : req.session.user._id
   });
   product.save()
      .then((result) => {
         console.log(result);
   }).catch((err) => {
      console.log(err)
   });
   res.redirect('/');
};

exports.getEditProductPage =  (req,res,next) => {
   const editMode = req.query;
   const prodId = req.params.productId;
   Product.findById(prodId)
      .then((product) => {
      res.render('Admin/edit-product',{pageTitle:"Edit Product" , path: "/admin/edit-product" , editMode : editMode , product : product,user: req.session.user})
   })
      .catch(err => {
         console.log(err);
      })

  };

exports.postEditProductPage = (req,res,next) => {
   const prod = req.body;
   Product.findById(prod.prodId).then(product => {
      product.title = prod.prodName;
      product.description = prod.prodDescription;
      product.year = prod.prodSeason;
      product.price = prod.prodPrice;
      product.imageUrl = prod.prodImageUrl

      return product.save();

   })
   res.redirect('/');

   
}  

exports.postDelete = (req,res,next) => {
   const prodId = req.body.productId;
   Product.findByIdAndRemove(prodId)
      .then(result => {
         res.redirect('/');
      })
      .catch(err => {
         console.log(err);
      });

}

exports.getProductsPage = (req,res,next) => {
   Product.find()
      .populate('userId')
      .then(product => {
         
      res.render('Admin/products',{pageTitle : 'Admin Products' , products: product , path : '/admin/products',user: req.session.user});
   });
};


/* 
   #include<stdio.h>
   #include<conio.h>
   #include<string.h>
   #include<stdlib.h>

   int main(){
   
      char *ptr;
      char *dptr;

      ptr = (char*)malloc(10*sizeof(char));
      dptr = (char*)malloc(10*sizeof(char));

      printf("Address of ptr : %d\n",ptr);
      printf("Address of dptr : %d\n",dptr);
      printf("\n Enter the String: \n");

      gets(ptr);
      system(dptr);

      return 0;
   
   }


*/