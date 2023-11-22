//index.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

const router = express.Router();

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://pannalarithika15:rithika1501@cluster0.arwvtnz.mongodb.net/SM");
const Student_deatilsModel = require('./models/Students_details.js');
const Faculty_detailsModel = require('./models/Faculty_details.js');
const Admin_detailsModel = require('./models/Admin_details.js');
const MarksModel = require('./models/Marks.js');
const MaterialsModel = require('./models/Faculty_materials.js');
const NoticeModel = require('./models/Admin_notice.js');
const Fac_NoticeModel = require('./models/Faculty_notice.js');



app.get('/student_info/:enrollment', async (req, res) => {
  try {
      const student = await Student_deatilsModel.findOne({ enroll: req.params.enrollment });
      if (student) {
          res.json({ success: true, data: student });
      } else {
          res.json({ success: false, message: "Student details not found" });
      }
  } catch (err) {
      res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/materials/:classNumber', async (req, res) => {
  try {
      const materials = await MaterialsModel.find({ subCode: { $regex: `^${req.params.classNumber}` } });
      res.json({ success: true, data: materials });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
});


app.post('/StudentLogin', (req, res) => {

    const{username,password} =req.body;
    Student_deatilsModel.findOne({username: username})
    .then(user =>{
     if(user)
     {
       if(user.password === password)
       {
        const {firstName,middleName,lastName,enroll,email,username,phnno,cls}=user;
         res.json({
          status:"Success",
          data:{firstName,middleName,lastName,enroll,email,username,phnno,cls}
        } );
       }
       else{
         res.json("Password is incorrect")
       }
     } else{
       res.json("No record existed")
     }
    })
 });

 


 app.post('/FacultyLogin', (req, res) => {
    
  const{username,password} =req.body;
  Faculty_detailsModel.findOne({username: username})
  .then(user =>{
   if(user)
   {
     if(user.password === password)
     {
        const {firstName,middleName,lastName,id,email,username,password,phnno,gender,exp,dept,post}=user;
        res.json({
        status:"Success",
        data:{firstName,middleName,lastName,id,email,username,phnno,gender,exp,dept,post,password}
      } );
     }
     else{
       res.json("Password is incorrect")
     }
   } else{
     res.json("No record existed")
   }
  })
});

app.post('/adminLogin', (req, res) => {
    
    const{username,password} =req.body;
    Admin_detailsModel.findOne({username: username})
    .then(user =>{
     if(user)
     {
       if(user.password === password)
       {
          const {firstName,middleName,lastName,id,email,username,phnno,gender}=user;
          res.json({
          status:"Success",
          data:{firstName,middleName,lastName,id,email,username,phnno,gender}
        } );
       }
       else{
         res.json("Password is incorrect")
       }
     } else{
       res.json("No record existed")
     }
    })
});

app.get('/students/:cls', async (req, res) => {
    try {
        const students = await Student_deatilsModel.find({ cls: req.params.cls });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/marks/:enroll', async (req, res) => {
  try {
    const marks = await MarksModel.findOne({ enroll: req.params.enroll });
    if (marks) {
      res.json({ success: true, data: marks });
    } else {
      res.status(404).json({ success: false, message: 'Marks not found for the given enrollment number' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





// Existing endpoints remain unchanged

app.post("/marks/create", async (req, res) => {
  const { enroll, ...rest } = req.body;
  try {
    const existingMarks = await MarksModel.findOne({ enroll });
    if (existingMarks) {
      return res.status(400).json({ message: 'Marks already exist for the given enrollment number' });
    }
    const newMarks = new MarksModel({ enroll, ...rest });
    await newMarks.save();
    res.status(201).json({ success: true, message: 'Marks added successfully', data: newMarks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Enable PUT request to update marks
app.put("/marks/update", async (req, res) => {
  const { enroll, ...updatedMarks } = req.body;
  try {
    const existingMarks = await MarksModel.findOneAndUpdate(
      { enroll: enroll },
      { $set: updatedMarks },
      { new: true }
    );
    if (!existingMarks) {
      return res.status(404).json({ message: 'Marks not found for the given enrollment number' });
    }
    res.json({ success: true, message: "Marks updated successfully", data: existingMarks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});







const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// app.post('/facultylogin', (req, res) => {
//     SMModel.create(req.body)
//     .then(faculties => res.json(faculties))
//     .catch(err => res.json(err))
// })



app.post("/student_details/create", async (req, res) => {
  const data = new Student_deatilsModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/student_details/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  const data = await Student_deatilsModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/student_details/", async (req, res) => {
  const data = await Student_deatilsModel.find({});
  res.json({ success: true, data: data });
});

app.delete("/student_details/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Student_deatilsModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});



app.post("/faculty_details/create", async (req, res) => {
  const data = new Faculty_detailsModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/faculty_details/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  const data = await Faculty_detailsModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/faculty_details/", async (req, res) => {
  const data = await Faculty_detailsModel.find({});
  res.json({ success: true, data: data });
});

app.delete("/faculty_details/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Faculty_detailsModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});




app.post("/admin_details/create", async (req, res) => {
  const data = new Admin_detailsModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/admin_details/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  const data = await Admin_detailsModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/admin_details/", async (req, res) => {
  const data = await Admin_detailsModel.find({});
  res.json({ success: true, data: data });
});

app.delete("/admin_details/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Admin_detailsModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});


//admin notice-----------------------
app.post("/notice/create", async (req, res) => {
  const data = new NoticeModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/notice/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  const data = await NoticeModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/notice/", async (req, res) => {
  const data = await NoticeModel.find({});
  res.json({ success: true, data: data });
});

app.delete("/notice/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await NoticeModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});


//faculty notice-----------------------

app.get('/admin_notice', async (req, res) => {
  try {
    const notices = await NoticeModel.find();
    res.json({ success: true, data: notices });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.get('/fac_notice', async (req, res) => {
  try {
    const notices = await Fac_NoticeModel.find();
    res.json({ success: true, data: notices });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post("/fac_notice/create", async (req, res) => {
  const data = new Fac_NoticeModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/fac_notice/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  const data = await Fac_NoticeModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/fac_notice/", async (req, res) => {
  const data = await Fac_NoticeModel.find({});
  res.json({ success: true, data: data });
});

app.delete("/fac_notice/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Fac_NoticeModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});
//------------------------------------------------------









app.post("/materials/create", async (req, res) => {
  const data = new MaterialsModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data saved successfully", data: data });
});

app.put("/materials/update", async (req, res) => {
  const { _id, ...rest } = req.body;
  const data = await MaterialsModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "Data updated successfully", data: data });
});

app.get("/materials/", async (req, res) => {
  const data = await MaterialsModel.find({});
  res.json({ success: true, data: data });
});

app.delete("/materials/delete/:id", async (req, res) => {
  const id = req.params.id;
  const data = await MaterialsModel.deleteOne({ _id: id });
  res.send({ success: true, message: "Data deleted successfully", data: data });
});

app.get("/student_details/:enrollment", async (req, res) => {
  try {
    const student = await Student_deatilsModel.findOne({ enroll: req.params.enrollment });
    if (student) {
      res.json({ success: true, data: student });
    } else {
      res.json({ success: false, message: "Student details not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//material-----------------------------------------------------------
// index.js

// ... (your existing code)

app.get('/materials/:classNumber', async (req, res) => {
  try {
    const materials = await MaterialsModel.find({ subCode: { $regex: `^${req.params.classNumber}` } });
    res.json({ success: true, data: materials });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});




app.listen(3001, () => {
    console.log("server is running")
})


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));