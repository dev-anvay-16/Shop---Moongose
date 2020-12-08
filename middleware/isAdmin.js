module.exports = (req, res, next) => {
    
    if (req.session.user.type !== "ADMIN") {
        res.redirect('/');
    }
    next();
}