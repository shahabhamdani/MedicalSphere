//Node modules used
const express = require('express'); // EXPRESS APP
const bodyParser = require('body-parser'); //For reading the body of the request 
const cors = require('cors'); // CORS to permit Cross origin resourse sharing
const mysql = require('mysql'); // For mysql database
const knex = require('knex'); //KNEX.JS = SQL query builder language

//Declaring app 
const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());



// Links to all the required route handlers
const register = require('./controllers/register');
const login = require('./controllers/login');
const admin = require('./controllers/admin');
const patient = require('./controllers/patient');
const doctor = require('./controllers/doctor')
const inventory = require('./controllers/inventory');
const riskPrediction = require('./controllers/riskPrediction');



//Connecting MYSQL databse = onlineDAB
var db = knex({
    client: 'mysql',
    connection: {
        host: 'sql12.freesqldatabase.com',
        user: 'sql12622078',
        password: 'RTanXy6fTr',
        database: 'sql12622078'
    }
})



//Routes for handleing Register, forwarded to  -> register.js 
app.post('/registerAdmin', (req, res) => register.handleRegisterAdmin(req, res, db));
app.post('/registerDoc', (req, res) => register.handleRegisterDoc(req, res, db));
app.post('/registerPatient', (req, res) => register.handleRegisterPatient(req, res, db));


//Routes for handleing Login, forwarded to  -> login.js 
app.post('/loginAdmin', (req, res) => login.handleLoginAdmin(req, res, db));
app.post('/loginPatient', (req, res) => login.handleLoginPatient(req, res, db));
app.post('/loginDoc', (req, res) => login.handleLoginDoc(req, res, db));






//Routes for handleing Admin related activities, forwarded to  -> admin.js 
app.get('/admin/getRegisterDocs', (req, res) => admin.handleGetRegisterDocs(req, res, db));
app.get('/admin/validDoc/:id', (req, res) => admin.handleValidDoc(req, res, db));
app.delete('/admin/invalidDoc/:id', (req, res) => admin.handleInvalidDoc(req, res, db));
app.post('/admin/registerDoc', (req, res) => admin.handleRegisterDoc(req, res, db));
app.get('/admin/searchDoc', (req, res) => admin.handleSearchDoc(req, res, db));
app.get('/admin/getAllDocs', (req, res) => admin.handleGetAllDocs(req, res, db))
app.get('/admin/getValidDocs', (req, res) => admin.handleGetValidDocs(req, res, db));
app.get('/admin/searchInAllDocs', (req, res) => admin.handleSearchInAllDocs(req, res, db))



//Routes for handleing Admin blog activities, forwarded to  -> admin.js 
app.get('/blogs/:id', (req, res) => admin.handleGetSingleBlog(req, res, db))
app.get('/blogs', (req, res) => admin.handleGetBlogs(req, res, db))
app.put('/admin/blogs/:id', (req, res) => admin.handleUpdateBlog(req, res, db));
app.post('/admin/blogs', (req, res) => admin.handleCreateBlog(req,res, db));
app.delete('/admin/blogs/:id', (req, res) => admin.handleDeleteBlog(req, res, db));



//Routes for  inventory related activities, forwarded to  -> inventory.js 
app.get('/getInventory', (req, res) => inventory.handleGetInventory(req, res, db))
app.get('/patient/getPharmacy/:id', (req, res) => patient.handleGetPharmacy(req, res, db))


//Routes for handleing Patient related activities, forwarded to  -> patient.js 
app.get('/patient/getDoctor', (req, res) => patient.handleGetDocList(req, res, db))
app.get('/patient/searchDoc', (req, res) => patient.handleSearchDoc(req, res, db));
app.post('/patient/bookAppointment', (req, res) => patient.handleBookAppointment(req, res, db));
app.get('/patient/getAppointments/:id', (req, res) => patient.handleGetAppointments(req, res, db));
app.get('/patient/getPrescriptions/:id', (req, res) => patient.handleGetPrescriptions(req, res, db));
app.post('/patient/sendFeedback', (req, res) => patient.handleSendFeedback(req, res, db));
app.get('/patient/getFeedback/:id', (req, res) => patient.handleGetFeedback(req, res, db));
app.delete('/patient/deleteFeedback', (req, res) => patient.handleDeleteFeedback(req, res, db));


app.get('/patient/getPatientMatrics/:pat_id', (req, res) => patient.handleGetPatientMetrics(req, res, db));
app.get('/patient/avlTime', (req, res) => patient.handleAvailableTimeSlot(req, res, db));
app.get('/patient/getFeedBackDocList/:pat_id', (req, res) => patient.handleGetFeedBackDocList(req, res, db));
app.post('/patient/giveFeedback', (req, res) => patient.handleGiveFeedback(req, res, db));



//Routes for handleing Doctor related activities, forwarded to  -> doctor.js 
app.get('/doctor/getAppointments/:id', (req, res) => doctor.handleGetAppointments(req, res, db));
app.get('/doctor/getDoctorMetrics/:doc_id', (req, res) => doctor.handleGetDoctorMetrics(req, res, db));
app.delete('/doctor/appointments/cancelApp', (req, res) => doctor.handleNotAvailable(req, res, db));
app.put('/doctor/editInfo/:id', (req, res) => doctor.handleEditInfo(req, res, db));
app.post('/doctor/addPrescription', (req, res) => doctor.handlePrescription(req, res, db));
app.get('/doctor/getFeedbacks/:doc_id', (req, res) => doctor.handleGetFeedbacks(req, res, db));
app.post('/doctor/confirmAppointment', (req, res) => doctor.handleConfirmBooking(req, res, db));
app.get('/doctor/getConfAppointments/:doc_id', (req, res) => doctor.getConfirmedAppointments(req, res, db));
app.post('/doctor/treated', (req, res) => doctor.handleTreated(req, res, db));
app.delete('/doctor/missedAppointment', (req, res) => doctor.handleMissed(req, res, db));
app.get('/doctor/getHistory/:d_id', (req, res) => doctor.handleGetHistory(req, res, db));

 

//Routs to Handle Future Risk Prediction 
app.post('/lung-cancer-prediction', (req, res) => riskPrediction.handleRiskPrediction(req, res));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

