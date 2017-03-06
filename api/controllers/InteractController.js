/**
 * InteractController
 *
 * @description :: Server-side logic for managing interacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req,res){
        if(req.user == undefined)
            return res.status(500).json({err: "You must be logged in to message."});

       Interact.create({
            u_id_tx: req.user.id,
            u_id_rx: req.params.all().u_id_rx,
            b_id: req.params.all().b_id,
            msg_tx: req.params.all().msg_tx,
            state: true
        }).exec(function(err,inter){
            if (err)
                return res.negotiate(err);

            Message.findOrCreate({user: inter.u_id_rx}, function(err, msg){
                msg.messages += 1;
                msg.save(function(error) {
                    if(error) {
                        console.log(err);
                        return res.negotiate(err);
                  }
                  console.log(msg);
                  return res.json(inter);
                });
            });
        });
    },
    reply: function(req,res){
        if(req.user == undefined)
            return res.status(500).json({err: "You must be logged in to message."});
        Interact.findOne({id: req.params.all().id, u_id_rx: req.user.id}).exec(function(err,inter){
            inter.msg_rx = req.params.all().msg_rx;
            inter.status = false;
            inter.save(function(error) {
                if(error) {
                    console.log(err);
                    return res.negotiate(err);
                }

                Message.findOrCreate({user: inter.u_id_tx}).exec(function(err,msgBack){
                    msgBack.messages += 1;
                    msgBack.save(function(error) {
                        if(error) {
                            console.log(err);
                            return res.negotiate(err);
                        }
                        return res.send(inter);
                    });
                });
            });
        });
    },
    get: function(req,res){
        if(req.user == undefined)
            return res.status(500).json({err: "You must be logged in."});

        Interact.find({u_id_tx: req.user.id}).exec(function(err,inter){
            if (err)
                return res.negotiate(err);

            return res.json(inter);
        });
    },
    display: function(req,res){
        if(req.user == undefined)
            return res.redirect("/");

        Interact.find({
            or: [
                {u_id_tx: req.user.id},
                {u_id_rx: req.user.id}
            ]
        }).exec(function(err, inter){
            if(err)
                return res.negotiate(err);

            var retMsg = [];
            inter.forEach(function(msg, index){
                var obj = {};
                obj.id = msg['id'];
                obj.msg = {};
                obj.msg.tx = msg['msg_tx'];
                obj.msg.rx = msg['msg_rx'] == undefined? "" : msg['msg_rx'];

                User.findOne({id: msg.u_id_rx}).exec(function(err, user_rx){
                    obj.to = {};
                    obj.to.id = user_rx.id;
                    obj.to.username = user_rx.username;

                    User.findOne({id: msg.u_id_tx}).exec(function(err, user_tx){
                        obj.from = {};
                        obj.from.id = user_tx.id;
                        obj.from.username = user_tx.username;

                        Book.findOne({id: msg.b_id}).exec(function(err, book){
                            obj.book = {};
                            obj.book = book;

                            retMsg.push(obj);
                            if(retMsg.length == inter.length) {
                                //console.log(JSON.stringify(retMsg,null,2));
                                Message.findOne({user: req.user.id}).exec(function(err,msg){
                                    if(!msg)
                                        return res.view('msg', {msg: retMsg});

                                    msg.messages = 0;
                                    msg.save(function(error) {
                                        if(error) {
                                            console.log(err);
                                            return res.negotiate(err);
                                        }
                                        return res.view('msg', {msg: retMsg});
                                    });
                                });
                            }
                        });
                    });
                });
            });
        });
    },
}
