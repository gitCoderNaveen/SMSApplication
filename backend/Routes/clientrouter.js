const express = require('express')
const router = express.Router()
const bodyParser=require('body-parser')
const clientModel = require('../Models/client-model')

router.use(bodyParser.json())

router.get('/', (req, res)=>{
    res.send('Clients Page')
})

router.get('/get', (req, res)=>{
    clientModel.find({})
    .then(users =>{
        res.json(users)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:"internal Server Error"})
    })
})

router.get('/getClientDetails', async(req, res)=>{
    const customerName = req.query.businessname||'';
    try {
        const myNames = await clientModel.find({ businessname:{$regex:customerName, $options:'i'} }, 'businessname doorno contactperson city pincode prefix mobileno');
        if (myNames.length>0) {
            res.json(myNames);
        } else {
            res.status(404).json({ message: 'Name not found for the specified' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})
router.get('/getClientPincode', async(req, res)=>{
    const clientPincode = req.query.pincode;
    try {
        const myPincode = await clientModel.find({ pincode:clientPincode }, 'businessname doorno contactperson city pincode prefix mobileno');
        if (myPincode.length>0) {
            res.json(myPincode);
        } else {
            res.status(404).json({ message: 'Pincode not found for the specified' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
})

module.exports=router

