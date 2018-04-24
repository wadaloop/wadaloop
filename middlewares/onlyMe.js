const onlyMe = (req,res,next) =>{
  if(req.user._id.toString() === req.params.id) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

module.exports = onlyMe;