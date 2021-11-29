const router = require('express').Router();
const { User,  Origin, Converter} = require('../db/models');


router.get('/', async (req, res)=>{
  let files;
  let id = req.session.userId
  try{
    files = await Converter.findAll({

      include: [
        {
          model: Origin,
          where: {
            'userId': id
          }
        }
      ]

    })
    console.log(files)
    return res.render('profile', { files })
  } catch (err){
    console.log(err)
    res.render('profile')
  }
});

// router.get('/edit',(req,res)=>{
//   res.render('edit')
// })


router.put('/edit/:id', async (req, res) => {
  let entry;
  try { //, password: req.body.password
    entry = await User.update({ name: req.body.name, email: req.body.email, surname: req.body.surname },{where:{id: req.params.id}, returning: true, plain: true});
  } catch (error) {
    // console.log(error);
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }

  return res.sendStatus(200);
});

router.post('/download/:id', async (req,res)=>{
  let id = req.params.id
  try {
    const file = await Converter.findOne({where: {id}})
    res.sendFile(file.path)
  } catch (err){
    res.sendStatus(500)
  }
})
module.exports = router;
