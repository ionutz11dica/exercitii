const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

// const DB_USERNAME = 'nicolaeionut11'
// const DB_PASSWORD = 'jon'

// mysql.createConnection({
// 	user : DB_USERNAME,
// 	password : DB_PASSWORD
// })
// .then(async (connection) => {
// 	await connection.query('DROP DATABASE IF EXISTS c9')
// 	await connection.query('CREATE DATABASE IF NOT EXISTS c9')
// })
// .catch((err) => {
// 	console.warn(err.stack)
// })


const sequelize = new Sequelize('c9', 'nicolaeionut11', '',{
	host: 'localhost',
	dialect : 'mysql',
	 logging: false,
	define: {
    	timestamps: false
	},
})

let Author = sequelize.define('author', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	address : Sequelize.STRING,
	age : Sequelize.INTEGER
})

let Book = sequelize.define('book', {
	title : Sequelize.STRING,
	pages : Sequelize.INTEGER 
})

Author.hasMany(Book)

const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		for (let i = 0; i < 10; i++){
			let author = new Author({
				name : 'name ' + i,
				email : 'name' + i + '@nowhere.com',
				address : 'some address on ' + i + 'th street'
			})
			await author.save()
		}
		res.status(201).json({message : 'created'})
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/authors', async (req, res) => {
	// should get all authors
	try{
		let authors = await Author.findAll()
		res.status(200).json(authors)
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.post('/authors', async (req, res) => {
	try{
		let author = new Author(req.body)
		await author.save()
		res.status(201).json({message : 'created'})
	}
	catch(err){
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.post('/authors/:id/books', async (req, res) => {
	// should add a book to an author
	try{

		Author.findById(req.params.id).then((result)=>{
			if(result){
				let book = req.body;
				book.authorId = result.id;
				Book.create(book);
				res.status(201).json({message : 'created'})
			}else{
			res.status(404).json({message : 'not found'})
		}
		})
		
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/authors/:id/books', async (req, res) => {
	// should list all of an authors' books
	try{
		Author.findById(req.params.id,{include:[Book]}).then((result)=>{
			if(result){
				let books = result.books;
				res.status(200).json(books);
			}else{
				res.status(404).json({message : 'not found'})
			}
		})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})


app.listen(8080)

module.exports = app