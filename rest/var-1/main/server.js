const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

// const mysql = require('mysql2/promise')

// const DB_USERNAME = 'root'
// const DB_PASSWORD = 'welcome12#'

// mysql.createConnection({
// 	user : DB_USERNAME,
// 	password : DB_PASSWORD
// })
// .then(async (connection) => {
// 	await connection.query('DROP DATABASE IF EXISTS tw_exam')
// 	await connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
// })
// .catch((err) => {
// 	console.warn(err.stack)
// })

const sequelize = new Sequelize('c9', 'nicolaeionut11', '',{
	dialect : 'mysql',
	logging: false
})

let Author = sequelize.define('author', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	address : Sequelize.STRING,
	age : Sequelize.INTEGER
},{
	timestamps : false
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
				address : 'some address on ' + i + 'th street',
				age : 30 + i
			})
			await author.save()
		}
		console.warn('CREATED')
		res.status(201).json({message : 'created'})
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/authors', async (req, res) => {
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

app.put('/authors/:id', async (req, res) => {
	// add the method to modify an author
	// a non existant author cannot be updated
	// only defined fields should be updated
	try{
		Author.findById(req.params.id).then((result)=>{
			if(result){
				result.update(req.body)
				result.save();
				res.status(202).json({message : 'accepted'})
			}else{
				res.status(404).json({message:'not found'})
			}
		})
	}
	catch(err){
		res.status(500).json({message : 'server error'})		
	}
})

app.delete('/authors/:id', async (req, res) => {
	// add the method to delete an author
	// a non existant author cannot be deleted
	try{
		// let author = await Author.findById(req.params.id)
		// if (!author){
		// 	res.status(404).json({message : 'not found'})
		// }
		// else{
		// 	await author.destroy()
		// 	res.status(202).json({message : 'accepted'})			
		// }
		
		Author.findById(req.params.id).then((result)=>{
			if(result){
				result.destroy();
				res.status(202).json({message:'accepted'})
			}else{
				
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