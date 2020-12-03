const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getting all
router.get('/', async (req, res) =>{
    try {
        const subscriber = await Subscriber.find()
        res.json(subscriber)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//getting one
router.get('/:id', getSubscriber ,(req, res) =>{
    res.send(res.subscriber.name)
})

//create one
router.post('/', async (req, res) =>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(subscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
//update one
router.patch('/:id', (req, res) =>{
    
})

//delete one
router.delete('/:id', getSubscriber, async (req, res) =>{
    try {
        await res.subscriber.remove()
        res.json({message: "deteled"});
    } catch (error) {
        
    }
})

async function getSubscriber(req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.send(404).json("couldn't find user") ;
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    res.subscriber = subscriber
    next()
}

module.exports = router
