const express = require('express');
const router = express.Router();
const controller = require('../controllers/guestbookControllers');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

const { append } = require('express/lib/response');

router.get('/login', controller.show_login_page);
router.post('/login', login, controller.handle_login);

router.get('/', controller.landing_page);

router.get('/new', verify, controller.new_entries);
router.post('/new', verify, controller.post_new_entry)

router.get('/post/:author', controller.show_user_entries);

router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user);

router.get("/loggedIn", verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);

router.use((req,res)=>{
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found.');
})

router.use((err,req,res,next)=>{
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})


//No longer in use
router.get('/guestbook', controller.entries_list);

router.get('/about', (reg,res) => {
    res.redirect('/about.html');
});

router.get('/peter', controller.peter_entries);
////////////////////////////////////////////

module.exports = router;