function errorHandler(err, req, res, next) {
    if (err) {
      res.status(500).json({ message: 'Oops.. something went wrong!' });
    } else {
      next();
    }
  }

module.exports = errorHandler 
