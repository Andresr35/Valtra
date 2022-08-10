var express = require('express');
var router = express.Router(); 
const adobe = require('../../utils/adobe');

router.post('/orders',async (req,res)=>{
    //console.log(req);
   // console.log(await adobe.getOrder())
   console.log('../../documentMergeOutput.pdf');
    res.sendFile(`C:/Users/Andres/Desktop/backup/Nodejsapps/server/documentMergeOutput.pdf`)
    
})

module.exports = router;