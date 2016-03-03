/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAllBooks: function(req,res){
    Book.find({}).exec(function(err, books){
      if (err)
        return res.negotiate(err);
      return res.send({books: books});
    });
  },
  getBook: function(req,res){
		Book.findOne({id: req.params.id}).exec(function(err, book){
			if (err)
        return res.negotiate(err);

			return res.send({ book: book});
		});
	},
	createBook: function(req,res){
		Book.create(req.params.all()).exec(function(err,book){
			if (err)
        return res.negotiate(err);

			return res.send({ book: book});
		});
	},
	deleteBook: function(req,res){
		Book.destroy({id: req.params.id}).exec(function(err,book){
			if (err)
		    return res.negotiate(err);

  			return res.ok();
		});
	}
};