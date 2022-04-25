const guestbookDAO =require('../models/guestbookModel');
const userDao = require('../models/userModel.js');

const db = new guestbookDAO();
db.init();

exports.show_login_page = function(req, res) {
    res.render("user/login");
};

exports.handle_login = (req,res)=>{
    res.render("newEntry",{
        title: "Guest Book",
        user: "user"
    });
};

exports.landing_page = (req,res)=>{
    db.getAllEntries()
        .then((list)=>{
            res.render("entries",{
                title: "Guest Book",
                entries: list
            });
            console.log('promise resolve');
        })
        .catch((err)=>{
            console.log('promise rejected', err);
        })
}

exports.new_entries = (req,res)=>{
    res.render('newEntry',{
        title: "Guest Book",
        user: "user"
    });
};

exports.post_new_entry = (req, res)=> {
    console.log('processing post-new_entry controller');
    if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
     }
    db.addEntry(req.body.author, req.body.subject, req.body.content);
    res.redirect('/loggedIn');
};

exports.show_user_entries = (req,res)=>{
    console.log('filtering author name', req.params.author);
    let user = req.params.author;
    db.getEntriesByUser(user).then(
        (entries) => {
            res.render("entries", {
                title: "Guest Book",
                user: "user",
                entries: entries
            });
        }).catch((err)=>{
            console.log('error handling author posts', err);
        });
};

exports.show_register_page = (req,res)=>{
    res.render("user/register");
};

exports.post_new_user = (req, res)=> {
    const user = req.body.username;
    const password = req.body.pass;
    if (!user || !password) {
    res.send(401, 'no user or no password');
    return;
     } 
     userDao.lookup(user,(err, u)=> {
        if (u) {
        res.send(401, "User exists:", user);
        return;
         }
        userDao.create(user, password);
        console.log("register user", user, "password", password);
        res.redirect('/login');
    });
};

exports.loggedIn_landing = (req, res)=> {
    db.getAllEntries()
      .then((list) => {
        res.render("entries", {
          title: "Guest Book",
          user: "user",
          entries: list
        });
      })
      .catch((err) => {
        console.log("promise rejected", err);
      });
  };

exports.logout=(req,res)=>{
    res
        .clearCookies("jwt")
        .status(200)
        .redirect("/");
};



// No longer in use
exports.entries_list = (req,res)=>{
    res.send('<h1>Guestbook Messages</h1><p>Show a list of guest book entries.</p>');
    db.getAllEntries();
}

exports.peter_entries = (req,res)=>{
    res.send('<h1>Processing Peter\'s Entries, see terminal</h1>');
    db.getPeterEntries();
}









