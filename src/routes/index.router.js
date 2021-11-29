const router = require('express').Router();
// const multer = require('multer');
const uploadMulter = require('../middlewares/uploadMulter')
const path = require('path')
const { Origin } = require('../db/models')

router.get('', (req, res) => {
  res.render('index')
});

router.get('/about', (req, res) => {
  res.render('about')
});

router.post('', uploadMulter.single('file'), async (req, res) => {
  
  try {
    const originFile = req.file;
    // const fileName = originFile.filename;
    const filePath = originFile.path;
    const userId = req.session?.userId;
    await Origin.create({ path: filePath, userId: userId })
    return res.sendStatus(200)
  } catch (err) {
    
    return res.sendStatus(500)
  }

})
// return res.redirect(`/download`)
router.get('/download', async function (req, res) {
  //find filePath of last file added.
  const found= await Origin.findAll({ //converted db findAll
    raw:true,
    limit: 1,
    where: {
    },
    order: [['createdAt', 'DESC']]
  })
  const file = found[0].path;
  res.download(file)
})

module.exports = router;
