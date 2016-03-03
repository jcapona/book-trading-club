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
    if(req.user == undefined)
      return res.send({err: "Not logged in"});

		Book.create(req.params.all()).exec(function(err,book){
			if (err)
        return res.negotiate(err);

      Prop.create({user_id: req.user.id, book_id: book.id}).exec(function(err,prop){
        if (err)
          return res.negotiate(err);

        return res.send({book: book, prop: prop});
      })
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