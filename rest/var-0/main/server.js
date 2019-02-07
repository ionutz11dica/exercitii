const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

// const DB_USERNAME = 'root'
// const DB_PASSWORD = 'welcome12#'

mysql.createConnection({
	user : 'nicolaeionut11',
	password : ''
})
.then(async (connection) => {
	await connection.query('DROP DATABASE IF EXISTS c9')
	await connection.query('CREATE DATABASE IF NOT EXISTS c9')
})
.catch((err) => {
	console.warn(err.stack)
})


const sequelize = new Sequelize('c9', 'nicolaeionut11', '',{
	dialect : 'mysql',
	logging: false
})

let Author = sequelize.define('author', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	address : Sequelize.STRING,
	age : Sequelize.INTEGER
})

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
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.post('/authors', async (req, res) => {
	// should add an author
	// author names and emails cannot be empty
	// author addresses can be empty
	// author emails have to be valid
	try{
		if(!req.body.name || !req.body.email){
			throw new Error("name or email empty")
		}
		if(req.body.email){
			if(req.body.email.indexOf('@')===-1){
				throw new Error("invalid email")
			}
		}
		Author.create(req.body).then((result)=>{
			if(result){
				res.status(201).json({message : 'created'})
			}
		})
	}
	catch(err){
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.listen(8080)

module.exports = app