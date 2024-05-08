import express from "express";
import db from "../db/connection.js";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

const registrarId = "REG" + Math.floor(Math.random() * 1000000);

router.get("/usercollection", async (req, res) => {
  let collection = db.collection("usercollection");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/userContactInfo", async (req, res) => {
  let collection = db.collection("userContactInfo");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/userInvoices", async (req, res) => {
  let collection = db.collection("userInvoices");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/calendarInfo", async (req, res) => {
  let collection = db.collection("calendarInfo");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.post("/submitUserRecord", async (req, res) => {
  try {
    let usercollectionDetails = {
      id: uuidv4(),
      name: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      phone: req.body.phone,
      accessLevel: req.body.accessLevel,
    };
    let userContactInfoDetails = {
      id: usercollectionDetails.id,
      name: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      zipCode: req.body.zipCode,
      registrarId: registrarId
    };
    
    if (req.body.accessLevel === "admin") {
      usercollectionDetails.level = 1;
    } else if (req.body.accessLevel === "manager") {
      usercollectionDetails.level = 2;
    } else {
      usercollectionDetails.level = 3;
    }

    let usercollection = db.collection("usercollection");
    let userContactInfo = db.collection("userContactInfo");
    let result = await userContactInfo.insertOne(userContactInfoDetails) + await usercollection.insertOne(usercollectionDetails);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.post("/submitcalendarEvent", async (req, res) => {
  try {
    let calendarEventDetails = {
      id: uuidv4(),
      title: req.body.title,
      start: req.body.start,
      end: req.body.end,
      rule: req.body.rule,
    }
    let calendarEvents = db.collection("calendarInfo");
    let result = await calendarEvents.insertOne(calendarEventDetails);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding calendar event");
  }
});

router.put("/updateCalendarEvent/:id", async (req, res) => {
  try {
    const query = { id: req.params.id }; 
    const updates = {
      $set: {
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
      },
    };

    let collection = db.collection("calendarInfo");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating calendar event");
  }
});


router.delete("/deleteCalendarEvent/:id", async (req, res) => {
  try {
    const query = { id: req.params.id }; 

    const collection = db.collection("calendarInfo");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting event");
  }
});

/* // This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("usercollection");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});



// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    let collection = await db.collection("usercollection");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating usercollection");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("usercollection");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting usercollection");
  }
}); */

export default router;
