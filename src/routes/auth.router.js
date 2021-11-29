const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.get('/signin', (req,res)=>{
  res.render('login')
});

router.get('/signup', (req,res)=>{
  res.render('register')
});



router.post('/signup', async (req, res)=>{
  try{
    const {name, surname, email, password: pass} = req.body;
    const saltRounds = 10;
    const password = await bcrypt.hash(pass, saltRounds);
    const currUser = await User.create({name, surname, email, password})
    req.session.userId = currUser.id;
    req.session.userName = currUser.name;
    req.session.userEmail = currUser.email;
    req.session.userSurname = currUser.surname;
    res.redirect('/');
  } catch (err){
    res.render('register', {error: 'Вы заполнили не все поля, либо пользователь с таким email уже зарегистрирован.'})
  }
});

router.post('/signin', async (req, res)=>{
  const {email, password} = req.body;
  const currUser = await User.findOne({where: { email } });
  if ((!currUser) || !(await bcrypt.compare(password, currUser?.password))){
    return res.render('login', {error: 'Вы ввели неправильный логин или пароль.'})
  }
    req.session.userId = currUser.id;
    req.session.userName = currUser.name;
    req.session.userEmail = currUser.email;
    req.session.userSurname = currUser.surname;
    res.redirect('/');

});

router.get('/logout', (req, res)=> {
  // Удаляем сессию с сервера (или базы данных, если сессия хранится там).
  req.session.destroy();
  // Говорим клиенту, чтобы он удалил куку.
  res.clearCookie('sid');
  res.redirect('/');
})



module.exports = router;
