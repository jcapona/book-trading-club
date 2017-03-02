/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    getBook: function(req, res) {
        Book.findOne({id: req.params.id}).exec(function(err, book) {
	    if (err)
                return res.negotiate(err);
            return res.json({book: book});
	});
    },
    getAllBooks: function(req, res) {
        Book.find({}).exec(function(err, books) {
            if (err)
                return res.negotiate(err);
            return res.json(books);
        });
    },
    searchBooks: function(req, res) {
        Book.find({
            or: [
                {title: {"contains": req.params.all().query}},
                {author: {"contains": req.params.all().query}}
            ]
        }).exec(function(err, books) {
            if (err) {
                console.log(err);
                return res.negotiate(err);
              }
            if (books.length == 0)
            return res.status(404).json({err: "Book not found :("});

            books.forEach(function(book,index) {
                Prop.findOne({book_id: book.id}).exec(function(err, prop) {
                    if (err)
                        return res.negotiate(err);

                    book.owner = {};
                    book.owner.id = prop.user_id;
                    book.owner.name = prop.user;

                    if (index + 1 == books.length)
                        return res.json(books);
                });
             });
        });
    },
    createBook: function(req, res) {
        if (req.user == undefined) {
            res.status(500);
            return res.send({err: "Not logged in"});
        }

	Book.create(req.params.all()).exec(function(err,book) {
	    if (err)
                return res.negotiate(err);

            Prop.create({user_id: req.user.id, user: req.user.username, book_id: book.id}).exec(function(err,prop) {
                if (err)
                    return res.negotiate(err);
                return res.send({book: book, prop: prop});
            })
        });
    },
    createFromIsbn: function(req, res) {
        if (req.user == undefined) {
            res.status(500);
            return res.send({err: "Not logged in"});
        }

        var isbn = req.params.all().isbn;
        var node_isbn = require('node-isbn');
        node_isbn.resolve(isbn, function (err, data) {
            if (err) {
                res.status(500);
                return res.send({err: err.toString()});
            }

            data['isbn'] = isbn;
            console.log('Data from isbn: ' + isbn + ': ' + JSON.stringify(data,null,2));

            var missing  = Utils.checkFields(data, 'book');
            if (missing.length > 0)
                return res.send({err: 'Couldnt get the information of the book :('});

            Book.create({
                title: data['title'],
                author: data['authors'],
                isbn: req.params.all().isbn,
                isbn10: data['isbn10'] !== undefined? data['isbn10'] : '',
                isbn13: data['isbn13'] !== undefined? data['isbn13'] : '',
                img: data['imageLinks'] !== undefined? data['imageLinks']['thumbnail'] : '/images/no-cover.png',
                link: data['previewLink'] !== undefined? data['previewLink'] : '',
            }).exec(function(err,mbook) {
                if (err) {
                    res.status(500);
                    return res.send({err: err.toString()});
                }

                Prop.create({user_id: req.user.id, book_id: mbook.id}).exec(function(err,prop) {
                    if (err)
                        return res.negotiate(err);

                    return res.send({book: mbook, prop: prop});
                });
            });
        });
    },
    getIsbn: function(req, res) {
        var node_isbn = require('node-isbn');
        node_isbn.resolve(req.params.id, function (err, data) {
            if (err)
                return res.status(500).send({err: err});
            console.log('Book found %j', data);
            return res.send({book: data});
        });
    },
    deleteBook: function(req, res) {
        Book.destroy({id: req.params.all().id}).exec(function(err,book) {
	    if (err)
	        return res.negotiate(err);
            Prop.destroy({book_id: req.params.all().id}).exec(function(err,book) {
                if (err)
                    return res.negotiate(err);
                return res.send({});
            });
	});
    },
}
