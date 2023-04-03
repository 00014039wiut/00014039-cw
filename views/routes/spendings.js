let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')


router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let spending = getAll('spendings').find(spending => spending.id == id)
        res.render('create', { spending: spending, modules: getAll(`${spending.Title , spending.Description}`) })
    })
    .put((req, res) => {
        let id = req.params.id

        let spendings = getAll('spendings')

        let spending = spendings.find(spending => spending.id == id)

        let idx = spendings.indexOf(spending)

        spendings[idx].Title = req.body.Title
        spendings[idx].Description = req.body.Description
        spendings[idx].dateTime = req.body.dateTime

        saveAll('spendings', spendings)

        res.json({ updated: true })
    })



module.exports = router

function  getAll(spendings) {
    return JSON.parse(fs.readFileSync(`./data/${spendings}.json`))
}

function saveAll(spendings, data) {
    fs.writeFileSync(`./data/${spendings}.json`, JSON.stringify(data))
}