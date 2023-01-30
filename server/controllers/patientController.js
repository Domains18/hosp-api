const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const Patient = require("../models/patientSchema");
const newPatient = asyncHandler(async (req, res) => {
    const { patientName, NationalId, patientAge, patientGender, patientPhone, patientEmail, visitedBefore } = req.body; 

    switch (true) {
        case !patientName:
            res.status(400);
            throw new Error("Please enter patient name");
            break;
        case !nationalId:
            res.status(400);
            throw new Error("Please enter patient national id");
            break;
        case !patientAge:
            res.status(400);
            throw new Error("Please enter patient age");
            break;
        case !patientGender:
            res.status(400);
            throw new Error("Please Enter patient gender");
            break;
        // case !patientPhone:
        //     res.status(400);
        //     throw new Error("Please enter patient phone number");
        //     break;
        // case !patientEmail:
        //     res.status(400);
        //     throw new Error("Please enter patient email");
        //     break;
        case !visitedBefore:
            res.status(400);
            throw new Error("Please enter if patient has visited before");
            break;
        default:
            break;
    }

    //check if patient has visited before
    const checkVisit = patientSchema.find({ nationalId: nationalId });
    if (checkVisit) {
        res.status(203);
        res.send("Patient has visited before");
        //update latest visit
        const lastVisit = patientSchema.findOneAndUpdate({}, {$set: {visitedBefore: true, "visitedBefore.Date" : new Date()}})
    } else {
        const patient = new Patient({
            patientName,
            nationalId,
            patientAge,
            patientGender,
            patientPhone,
            patientEmail,
            visitedBefore
        });
        const createdPatient = await patient.save();
        res.status(201).json("Patient Details recorded Successfully");
    }

});
