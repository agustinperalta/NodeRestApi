const {Router} = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json');
const books = require('../books.json');

//Get de libros
router.get('/books',(req, res)=>{
    let authorBooks = [];
    _.each(books, (book)=>{
        let authori
        _.find(authors, (author) =>{ if(author.id === book.authorId){authori = author}})
        resp = {id:book.id, name: book.name, author:authori}
        authorBooks.push(resp);
    })
    console.log(authorBooks)
    res.json(authorBooks);
})

//Post de Libros
router.post('/books', (req, res)=>{
    const {id, name, authorId} = req.body;
    let existeId = false;
    let existeAuthor = false;
    if( id && name && authorId)
    {
        _.each(books,(book) =>{if(book.id === id){existeId = true}})
        _.each(authors, (author) =>{if(author.id === authorId){existeAuthor = true}})

        if(existeId){
            res.status(400).json({'statusCode':'Ya existe book con ese Id'})
        }else{
            if (existeAuthor){
                const newBook = {...req.body};
                books.push(newBook)
                res.status(200).json({'added':'Ok'});
            }else{res.status(400).json({'statusCode':'No existe author con es Id'})}
        }
    }else{
        res.status(400).json({'statusCode':'Error en el body'})
    }
});

//Put de Libros
router.put('/books/:id',(req, res) =>{
    const idpar = req.params.id
    const {id, name, authorId} = req.body;
    let existeAuthor = false;
    if (authorId === ''){
        res.status(400).json({'statusCode':'Error en el body'})
    }else{
        _.each(authors, (author) =>{if(author.id === authorId){existeAuthor = true}})
        if(existeAuthor){
            if(id){
                res.status(400).json({'statusCode':'No se puede modificar el id'})
            }else{
                _.each(books, (book)=>{
                    if(book.id === idpar){
                        if(name ===''){
                            res.status(400).json({'statusCode':'Error en el body'})
                        }else{
                            book.name = name;
                            book.authorId = authorId;
                            res.json({'modified':'Ok'});
                        }
                    }
                })
            }
        }else{
            res.status(400).json({'statusCode':'El author no existe'})
        }
    }
})

//Delete de Libros
router.delete('/books/:id',(req, res)=>{
    const id = req.params.id
    _.remove(books, (book)=>{
        return book.id == id;
    })
    res.json(books);
})


module.exports = router;