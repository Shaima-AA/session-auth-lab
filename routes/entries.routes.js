//import the router from express and export it at the bottom of the file
const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Entry = require('../models/Entry')




router.get('/new', isSignedIn, (req, res) => {
    res.render('new-entries.ejs')
})

router.post('/', isSignedIn, async (req, res) => {
    console.log(req.session.user)

    req.body.isPublic = req.body.isPublic === 'on'
    req.body.owner = req.session.user._id
    const oneEntry = await Entry.create(req.body);

   res.redirect('/entries')
})


router.get('/',async (req, res) => {

    const allpublic = await Entry.find({isPublic: true})
    res.render('all-entries.ejs', { entries: allpublic })
})


router.get('/my-entries', isSignedIn, async (req, res) => {
    const myEntries = await Entry.find({owner: req.session.user._id})
    res.render('all-entries.ejs', { entries: myEntries })

})

// router.get('/:_id/edit', isSignedIn, async (req, res) => {
//     const entry = await Entry.findById(req.params._id)
//     res.render('edit-entries.ejs', { entries: entry })
// })
// router.put('/:_id/edit', isSignedIn, async (req, res) => {
//     req.body.isPublic = req.body.isPublic === 'on'
//     const entry = await Entry.findByIdAndUpdate(req.params._id, req.body, { new: true })
//     res.render('edit-entries.ejs', { entries: entry })
// })


//delete
// router.delete('/:_id/', isSignedIn, async (req, res) => {
//     const entry = await Entry.findByIdAndDelete(req.params._id)
//     res.redirect('/entries')
// })
module.exports = router;
