import express from 'express';

const router = express.Router();

router.get('/', (req, res)=>{
    const name = {
        first: 'Jane',
        last: 'Doe'
    } 
    res.send(name);
});

router.get('/math', (req, res)=>{
    let math = 60; 
    let eng = 70; 
    let avg = (math + eng)/2
    res.send({
        avg: avg,
        message: 'Average of Math and English marks',
        status: 'worked'
    })
});

router.post('/average/percentage', (req, res)=>{
    console.log(req.body)
    // calculate the average percentage
    res.send('ok')
});

// Activity
// create a route with path /sum
// This route will get the sum from an array which you'll add on postman

export default router;