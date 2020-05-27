const {Router} = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json');

//GetAllAuthors
router.get('/authors', (req, res) =>{
    res.json(authors);
})

//CreateAuthor
router.post('/authors',(req,res) =>{
    let existe = false;
    const {id, name, lastName} = req.body;
    if(id && name && lastName){
        authors.forEach(auth => {
            if (auth.id === id){existe=true;} 
        });
        if (!existe){
            const newAuthor = {...req.body};
            authors.push(newAuthor);
            res.status(200).json({'added':'Ok'});
        }
        else{res.status(400).json({'statusCode':'Ya existe author con ese Id'})}
    }else{
        res.status(400).json({'statusCode':'Error en el body'})
    }
})

//ModifiedAuthor
router.put('/authors/:id',(req,res)=>{
    const idpar = req.params.id
    const {id, name, lastName} = req.body;
    if(id){
        res.status(400).json({'statusCode':'No se puede modificar el id'})
    }else{
        _.each(authors, (author)=>{
            if(author.id === idpar){
                if(name ==='' || lastName === ''){
                    res.status(400).json({'statusCode':'Error en el body'})
                }else{
                    author.name = name;
                    author.lastName = lastName;
                    res.json({'modified':'Ok'})
                }
            }
        })
    }
})

//DeleteAuthor
router.delete('/authors/:id',(req, res)=>{
    const id = req.params.id
    _.remove(authors, (author)=>{
        return author.id == id;
    })
    res.json(authors);
})
module.exports = router;