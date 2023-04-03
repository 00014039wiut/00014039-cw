
const express = require('express')
const app = express()
const port = 8000

const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({extended:false}))



app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create', (req, res) => {
    const title = req.body.Title
    const Description = req.body.Description
    const dateTime = req.body.dateTime

    if(title.trim()==='' && Description.trim()=== ''){
        res.render('create', {error:true})
    }else{
        fs.readFile('./data/spendings.json', (err, data)=>{
            if (err) throw err
            
            const spendings=JSON.parse(data)

            spendings.push({
                id : id (),
                Title : title,
                Description : Description ,
                dateTime
            })

            fs.writeFile('./data/spendings.json', JSON.stringify(spendings), err =>{
                if (err) throw err

                res.render('create', {success:true})
            })
        })
    }
})

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/spendings', (req, res)=>{
    fs.readFile('./data/spendings.json', (err, data)=>{
        if(err) throw err

        const spendings = JSON.parse(data)

        res.render('spendings', {spendings : spendings})
    })
}) 


app.get('/update', (req, res) =>{
    res.render('update')
})

app.get('/spendings/:id', (req, res) =>{
    const id = req.params.id

    fs.readFile('./data/spendings.json', (err, data)=>{
        if(err) throw err

        const spendings = JSON.parse(data)
        const spending = spendings.filter(spending => spending.id == id)[0]
        res.render('detail', { spending : spending})

    })
})

app.get('/api/v1/spendings', (req, res) => {
    fs.readFile('./data/spendings.json', (err, data)=>{
        if(err) throw err

        const spendings = JSON.parse(data)
        res.json(spendings)

    })
})

//Delete-button
app.get('/:id/delete', (req, res) => {
    const id =req.params.id

    fs.readFile('./data/spendings.json', (err, data) => {
        if (err) throw err

        const spendings = JSON.parse(data)
        const filteredspendings = spendings.filter (spending => spending.id != id)

        fs.writeFile('./data/spendings.json', JSON.stringify(filteredspendings), (err) => {
            if (err) throw err

            res.render('spendings', {spendings : filteredspendings, deleted :true})
        })
    })
})


app.get('/spendings/:id/update', (req, res) => {
    let id = req.params.id
    fs.readFile('./data/spendings.json', (err, data) => {
        if (err) throw err
    })
    const spendings = JSON.parse(data)
    const filteredspendings = spendings.filter (spending => spending.id != id)
    fs.writeFile('./data/spendings.json', JSON.stringify(filteredspendings), (err) => {
        if (err) throw err

        res.render('spendings', {spendings : filteredspendings, deleted :true})
    })
    
    // TODO
    res.render('update', { spending: filteredspendings, updated :true
    })
})



//localhost:8000
app.listen(8000, error => {
    if (error) console.log(error)

    console.log('Server running 8000')
})



function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
}
