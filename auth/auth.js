const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt')

module.exports = function(app, Student) {
    passport.use(new LocalStrategy(
        {usernameField: 'email'},
        (email, password, done) => {
            Student.findOne({email: email}, (err, student) => {
                if(err) return done(err);
                if(!student) return done(null, false);
                if(!bcrypt.compareSync(password, student.password)) return done(null, false);
                return done(null, student);
            })
        }
    ))

    passport.serializeUser((user, done) => {
        console.log('Inside serializeUser callback, serializing user...');
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        console.log('inside deserializeUser callback');
        Student.findById(id, (err, student) => {
            if(err) return done(err);
            console.log('searching through db')
            done(null, student);
        })
    })
}
