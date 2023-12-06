const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')
//get list from db
router.get("/ninjas", function(req, res){
    // Ninja.find({}).then(function(ninja){
    //     res.send(ninja)
    // })
    Ninja.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true
            }
        }
    ]).then(function(ninjas){
        res.send(ninjas);
    }).catch(function(error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    });
})

router.get("/ninjas/:id", function(req, res){
    Ninja.findOne({_id: req.params.id}).then(function(ninja){
        res.send(ninja)
    })
})

router.post("/ninjas", function(req, res, next){
    const newNinja = new Ninja(req.body);

    // Save the new ninja to the database
    newNinja.save()
        .then(function(ninja){
            res.send(ninja);
        })
        .catch(next)

    })

router.put("/ninjas/:id", function(req, res){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ninja){
        res.send(ninja)
    })
})

router.delete("/ninjas/:id", function(req, res){
    Ninja.findByIdAndDelete({_id: req.params.id}).then(function(ninja){
        res.send(ninja)
        console.log('success delete')
    }).catch(function(err){
        res.status(404).send({error: 'Not found'});
    })
}) 

module.exports = router;