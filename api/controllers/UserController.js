/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dashboard: function(req,res){
    if(req.user == undefined)
      return res.redirect("/");

    Prop.find({user_id: req.user.id}).exec(function(err, books){
      if(err)
        return res.negotiate(err);

      //console.log(JSON.stringify(books,null,2));
      var book_obj = [];
      books.forEach(function(m_book,index){

        //console.log(JSON.stringify(m_book,null,2));
        Book.findOne({id: m_book.book_id}).exec(function(err, book){
          book_obj.push(book);
          //console.log(JSON.stringify(book,null,2));

          if(index + 1 == books.length){
            //console.log(JSON.stringify(book_obj,null,2));
            return res.view('dashboard', {books: book_obj});
          }
        });
      })

    });
	},
};

