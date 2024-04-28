import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'SECURIN';
const collectionName = 'SECURIN';

app.use(cors());

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async client => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        app.get('/fetchData', async (req, res) => {
            try {
                const limit = parseInt(req.query.limit) || 10;
                const page = parseInt(req.query.page) || 1;
                const skip = (page - 1) * limit;

                const totalDocuments = await collection.countDocuments({});
                const cursor = collection.find({}).skip(skip).limit(limit);
                const cveData = await cursor.toArray();

                const response = {
                    data: cveData,
                    total: totalDocuments,
                    page: page,
                    limit: limit
                };

                res.json(response);
            } catch (error) {
                console.error('Error fetching data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.get('/fetchCVEDetails', async (req, res) => {
            try {
                const cveId = req.query.id;
                if (!cveId) {
                    res.status(400).json({ error: 'CVE ID is required' });
                    return;
                }
                const cveDetails = await collection.findOne({ 'cve.id': cveId });

                if (!cveDetails) {
                    res.status(404).json({ error: 'CVE details not found' });
                    return;
                }

                res.json(cveDetails);
            } catch (error) {
                console.error('Error fetching CVE details:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

