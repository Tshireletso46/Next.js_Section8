// back-end

import fs from 'fs';
import path from 'path';

function buildFeebackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath); //using fs module to write to that filePath
    const data = JSON.parse(fileData);
    return data
}

function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedback = {
            id: new Date(). toISOString(),
            email: email, 
            text: feedbackText,
        };
       const filePath =  buildFeebackPath(); //creates an absolute path to that folder 
       const data = extractFeedback(filePath);
       data.push(newFeedback);
       fs.writeFileSync(filePath, JSON.stringify(data));
       res.status(201).json({message: 'success!', feedback: newFeedback}); //sends back the response after the file has been succssfully updated and sends back an object in json format with a message and feedback. 
    } else {
        const filePath =  buildFeebackPath(); //creates an absolute path to that folder 
       const data = extractFeedback(filePath);
        res.status(200).json({feedback:'data'}); // this function excecutes after the if statement has went through 
    }
}

export default handler;