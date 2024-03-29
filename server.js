const express = require('express')
const path = require("path")
const app = express()
const PDFMerger = require('pdf-merger-js');
var mer2 = new PDFMerger();

const multer  = require('multer')
const {mergePdfs} = require('./merge')
const upload = multer({ dest: 'uploads/' })

app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname,'public')))
const port = 3000 || process.env.PORT

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/merge', upload.array('pdfs', 2), async(req, res, next) =>{
   console.log(req.files)
   let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
   res.redirect(`https://unite-n04g.onrender.com/static/${d}.pdf`);
})


app.listen(port, () => {
  console.log(`Example app listening on port https://unite-n04g.onrender.com`);
}) 