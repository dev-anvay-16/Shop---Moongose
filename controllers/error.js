exports.error = (req,res,next) => {
   res.status(404).render('Customer/404',{pageTitle: "Page Not Found"});
};