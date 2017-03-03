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

        Prop.find({user_id: req.user.id}).exec(function(err, books) {
            if (err)
                return res.negotiate(err);

            if (books.length == 0)
                return res.view('dashboard',{books:[]});

            var book_obj = [];
            books.forEach(function(m_book,index) {

              Book.findOne({id: m_book.book_id}).exec(function(err, book){
                book_obj.push(book);

                if (index + 1 == books.length) {
                  return res.view('dashboard', {books: book_obj});
                }
              });
            })

        });
    },
    update: function(req,res){
        if (req.user == undefined)
            return res.send({err: "Not logged in"});

        User.findOne({id: req.user.id}).exec(function(err, user) {
            if (err) {
                console.log(err);
                return res.negotiate(err);
            }

            if (req.params.all().name) {
                user.name = req.params.all().name;
            }
            if (req.params.all().city) {
                user.city = req.params.all().city;
            }
            if (req.params.all().state) {
                user.state = req.params.all().state;
            }
            if (req.params.all().country) {
                user.country = req.params.all().country;
            }

            user.save(function(error) {
                if (error) {
                  console.log(err);
                  return res.negotiate(err);
                }
                console.log(user);
                return res.send(user);
            });

        });
    },
};

