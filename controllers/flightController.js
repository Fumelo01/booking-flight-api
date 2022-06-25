const { v4: uuidv4 } = require('uuid');
let Book = require("../models/Flight.json");
const fs  = require("fs");
const path = require('path');
const db = path.join (__dirname,'../models', '/Flight.json' );
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const join = today.toDateString()
const time = today.toLocaleTimeString('en-US')



exports.example = (req, res) => {
  console.log("example")
  res.sendFile(path.join(__dirname, '../models', '/home.html'));
  //__dirname : It will resolve to your project folder.
};












//Get all flights
exports.allFlights = (req, res) => {
 // fetch all flight tickets
  // send the flight array as response to the client
  res.json({Book})
}



//Book a flight
exports.bookFlight = (req, res) => {
//Add new flight to flghts list
  let ticket = req.body
  let uid = uuidv4()
  Book.push({...ticket, time:`${time}`, date : `${join}`, id: uid});

  //Stringify the json data
  let stringedData = JSON.stringify(Book, null, 2)

  //Rewrite the file: flights.json
  fs.writeFile (db , stringedData, (err)=> {
    if (err) {
      return res.status(500).json ({message : err})
    } else {
      console.log({log: `Flight ticket with id: ${uid} has been created.`})
    }
  })
  console.log("\nDatabase successfully updated")
  return res.status(200).json({message: `New ticket with id: ${uid} has been created`})
}




//Get a single ticket
exports.ticket = (req, res) => {
//fetch req.params.id
  let id = req.params.id

  //find flight with that id
  let found = Book.find(ticket => {
    return String(ticket.id) === id
  })
  if (found) {
    //return flight object as response
    console.log({log: `Flight ticket with id: ${id} has been found.`})
    return res.status(200).json({ Ticket : found})
  } else {
    //if id is not found, return 404 error
   console.log({ error_404: `Flight ticket with id: ${id} was not found.`})
    return res.status(404).json({error : `Flight ticket with id: ${id} not found`})
  }

}







//Modify a ticket
exports.editTicket = (req, res) => {
  //fetch req.params.id
  let {id} = req.params

  //find flight with that id
  let found = Book.find(ticket => {
    return String(ticket.id) === id
  })
  if (found) {
    const { title, price,} = req.body
    if (title) {
      found.title = title
    }
    if (price) {
      found.price = price
    }
    //Stringify the json data
    let stringedData = JSON.stringify(Book, null, 2)

    //Rewrite the file: flights.json

    fs.writeFile (db , stringedData, (err)=> {
      if (err) {
        return res.status(500).json ({message : err})
      } else {
        console.log({ log: `Flight ticket with id: ${id} has been Updated..`})
      }
    })
    //return updated object as response
    return res.status(200).json({ message : `Flight ticket with id : ${id} has sucessfully been Updated`})
  } else {
    //if id is not found, return 404 error
    console.log({error_404: `Flight ticket with id: ${id} was not found`})
    return res.status(404).json({error : `Flight ticket with id: ${id} not found`})
  }



}


//Delete a ticket
exports.delTicket = (req, res) => {
  //fetch req.params.id
  let id = req.params.id
  Book = Book.filter((ticket) => ticket.id != id)

  //Stringify the json data
  let stringedData = JSON.stringify(Book, null, 2)

  //Rewrite the file: flights.js

  fs.writeFile (db , stringedData, (err)=> {
    if (err) {
      return res.status(500).json ({message : err})
    } else {
      console.log({ log: `Flight ticket with id: ${id} has been deleted.`})
    }
  })

  res.send(`Flight ticket with id : ${id} has sucessfully been deleted.`)
}

