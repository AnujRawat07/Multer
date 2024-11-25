const express=require('express');
const app=express();
const ejs=require('ejs');
const multer=require('multer')

//jo b user frontend s file upload krega usko hamare uploads folder m daldo
// and jo y upload h jiska ander data aaiga vo ek middleware ha tw usko ham apna /upload wala route s phle handle krenge  
// const upload=multer({dest:'uploads/'})


app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
     res.render("homepage")
})

//yha pr vo upload wala middleware user kia with single means single file uploads hogi and single m ham us particular file ka nam likhnege ki us particular file ka nam ky h jo hmne frintend m derkha ha file ko 
//we are not able to access file it is gving corrupt file so we use disk storage which will give full control to disk storage\
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)    //here we are appending the fiile with the data taki kisi ar k b file name same hua tw vo date ka sth sth appennd hojaigi
    }
})
const upload=multer({storage:storage})
app.post('/upload',upload.single('profileImage'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/')
    
})

app.listen(3000,()=>{
    console.log('listening at the port 3000')
})