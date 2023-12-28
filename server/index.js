const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routes

//registration
app.post("/registration", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, phone_number, department, position, isAdmin } =
      req.body;
    const newMember = await pool.query(
      "INSERT INTO member (name, email, phone_number,department,position,isAdmin) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [name, email, phone_number, department, position, isAdmin]
    );
    res.json(newMember.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all members
app.get("/registration", async (req, res) => {
  try {
    const member = await pool.query("SELECT * FROM member");
    res.json(member.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//getting a specific member
app.get("/registration/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = await pool.query(
      "SELECT * FROM member WHERE member_id = $1",
      [id]
    );
    res.json(member.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a member
app.put("/registration/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { department, email } = req.body;
    console.log(department);
    const updatedMember = await pool.query(
      "UPDATE member SET department = $1 ,email = $2 WHERE member_id = $3",
      [department, email, id]
    );

    res.json("member was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a record
app.delete("/registration/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = pool.query(
      "DELETE FROM member WHERE member_id = $1",
      [id]
    );

    res.json("member has been deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
