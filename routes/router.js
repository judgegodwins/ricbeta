const passport = require('passport')

const bcrypt = require('bcrypt');


function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}


function handleAuth(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if(err) { return next(err); }
        console.log('authenticating...')
        console.log('User: ', user);
        if(!user) { return res.redirect('/login'); }

        console.log(info)
        req.login(user, (err) => {
            console.log('req.user: ', req.user);
            console.log('req.passport: ', req.session.passport)
            console.log('Inside login function')
            if(err) return next(err);

            return res.redirect('/student_dashboard');
        })
    })(req, res, next);
}


module.exports = function(app, Student) {
    app.route('/login')
        .get((req, res) => {
            res.render('login');
        })
        .post(handleAuth);
    
    app.route('/create_account')
        .post(( req, res, next ) => {
            console.log(req.body);
            const {email, password, firstname, middlename, lastname, gender, birth_date} = req.body;
            console.log(typeof birth_date);
            Student.findOne({email: email}, (err, student) => {
                if(!student) {
                    let newStudent = new Student({
                        email: email,
                        first_name: firstname,
                        middle_name: middlename,
                        last_name: lastname,
                        password: bcrypt.hashSync(password, 12),
                        gender: gender,
                        birth_date: new Date(birth_date),
                    })
                    newStudent.save((err, user) => {
                        if(err) {res.send(err); return next(err);}
                        return next(null, user);
                    });
                } else {
                    res.send('This user already exists');
                }
            })
        }, handleAuth)
        .get((req, res) => {
            res.render('createaccount');
        })

    app.get('/student_dashboard', ensureAuthenticated, (req, res) => {
        res.send('Student Dashboard')
    })
    app.get('/clear', (req, res) => {
        Student.remove({}, (err) => {
            if(!err) res.send('Successful')
        })
    })
    app.get('/authrequired', ensureAuthenticated, (req, res) => {
        console.log(req.isAuthenticated());
    })
    app.get('/all', (req, res) => {
        Student.find({}, (err, docs) => {
            if(!err) res.send(docs)
        })
    })
}