const express = require('express');
const Form1Model = require('./Form1Model');
const AwardCategoryModel = require('./AwardCategoryModel');
const LoginModel = require('./LoginModel');
const e = require('express');

const router = express.Router()

module.exports = router;

//Post Form 1 Data Method
router.post('/post-form1-data', async (req, res) => {

    try {

        const Form1Data_obj = new Form1Model({
            dataAwardCategorySelectionId: req.body.dataAwardCategorySelectionId,
            NameApplicant: req.body.NameApplicant,
            CertificateNumber: req.body.CertificateNumber
        });
        const dataToSave = await Form1Data_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Post Form 1 Data Method
router.get('/getAll-form1Data', async (req, res) => {

    try {
        const allData = await Form1Model.find();
        var filterData = [];
        for (var i = 0; i < allData.length; i++) {
            var filterTempData = [];
            // filterTempData.push(allData[i]._id);
            filterTempData.push(allData[i].dataAwardCategorySelectionId ? allData[i].dataAwardCategorySelectionId : "");
            filterTempData.push(allData[i].NameApplicant ? allData[i].NameApplicant : "");
            filterTempData.push(allData[i].CertificateNumber ? allData[i].CertificateNumber : "");
            filterTempData.push(allData[i]._id ? allData[i]._id : "");
            filterData.push(filterTempData);
        }
        res.status(200).json(
            {
                tableHead: ["Award Category", "Applicant Name", "Certificate No.", "Action"],
                tableData: filterData
            });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// //Get all AwardCategory
router.get('/getAll-AwardCategory', async (req, res) => {
    try {
        const data = await AwardCategoryModel.find();
        var filterData = [];
        for (var i = 0; i < data.length; i++) {
        filterData.push({ label: data[i].name, value: data[i].name });
        }
        res.json(filterData);

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// //Post AwardCategory data
router.post('/post-AwardCategory', async (req, res) => {
    try {
        const AwardCategoryModel_obj = new AwardCategoryModel({
            name: req.body.name
        })
        const dataToSave = await AwardCategoryModel_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})
//login user data
router.post('/post-UserData', async (req, res) => {
    try {
        const LoginModel_obj = new LoginModel({
            Email: req.body.Email,
            Password: req.body.Password,
        })
        const dataToSave = await LoginModel_obj.save();
        res.status(200).json({ Message: "Data Saved Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.post('/get-UserData', async (req, res) => {
    try {
        var query = { Email: req.body.Email, Password: req.body.Password };
        const getUserData = await LoginModel.find(query).clone();
        res.status(200).json({ getUserData });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.delete('/delete-Form1Data/:id', async (req, res) => {
    // console.log(req.body.NameApplicant)
    // res.send("done")
    try {
        // const data= await dbConnect();
        const result = await Form1Model.findByIdAndDelete(req.params.id);
        res.status(200).json({ Message: "Data Deleted Sucessfully!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
router.get('/getById-form1Data/:_id', async (req, res) => {

    try {
        const getOneData = await Form1Model.findById(req.params._id);

        res.status(200).json(getOneData);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.patch('/post-form1UpdateData', async (req, res) => {

    try {

        const Form1Data_obj = new Form1Model({
            _id: req.body._id,
            dataAwardCategorySelectionId: req.body.dataAwardCategorySelectionId,
            NameApplicant: req.body.NameApplicant,
            CertificateNumber: req.body.CertificateNumber
        });

        // create a filter for a movie to update
        const filter = { _id: Form1Data_obj._id };
        // this option instructs the method to create a document if no documents match the filter
        const options = { upsert: true };
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                dataAwardCategorySelectionId: Form1Data_obj.dataAwardCategorySelectionId,
                NameApplicant: Form1Data_obj.NameApplicant,
                CertificateNumber: Form1Data_obj.CertificateNumber
            }
        };

        const result = await Form1Model.updateOne(filter, updateDoc, options).exec();

        res.status(200).json({ Message: `Data updated successfully!` });
        // res.status(200).json(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);


    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
