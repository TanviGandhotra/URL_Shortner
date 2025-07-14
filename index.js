const express=require('express')
const mongoose= require('mongoose')
const shortUrl=require('./models/shortUrl');

mongoose.connect('mongodb://localhost/urlShortener',{
    useNewUrlParser:true,useUnifiedTopology:true
})
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.get('/',async (req,res)=>{
     const shortUrls= await shortUrl.find();
res.render('index',{shortUrls:shortUrls})
})
app.post('/shortUrl', async (req,res)=>{
 await shortUrl.create({
    full:req.body.fullUrl
})
res.redirect('/')
});

app.get('/:shorturl', async (req,res)=>{
const sUrl=await  shortUrl.findOne({short: req.params.shorturl});
if(sUrl==null) return res.sendStatus(404);
sUrl.clicks++;
sUrl.save();
res.redirect(sUrl.full);

})
app.listen(process.env.PORT || 5000);
