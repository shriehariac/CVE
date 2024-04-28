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

        // Endpoint to fetch CVE details by ID
        app.get('/fetchCVEDetails/:id', async (req, res) => {
            try {
                const cveId = req.params.id;
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

        // Endpoint to fetch CVEs by year
        app.get('/fetchCVEsByYear/:year', async (req, res) => {
            try {
                const year = req.params.year;
                const cves = await collection.find({ 'cve.year': year }).toArray();

                res.json(cves);
            } catch (error) {
                console.error('Error fetching CVEs by year:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // Endpoint to fetch CVEs by score
        app.get('/fetchCVEsByScore/:score', async (req, res) => {
            try {
                const score = parseFloat(req.params.score);
                const cves = await collection.find({ 'metrics.cvssMetricV3.cvssData.baseScore': { $gte: score } }).toArray();

                res.json(cves);
            } catch (error) {
                console.error('Error fetching CVEs by score:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // Endpoint to fetch CVEs modified within last N days
        app.get('/fetchCVEsByLastModified/:days', async (req, res) => {
            try {
                const days = parseInt(req.params.days);
                const date = new Date();
                date.setDate(date.getDate() - days);

                const cves = await collection.find({ lastModified: { $gte: date } }).toArray();

                res.json(cves);
            } catch (error) {
                console.error('Error fetching CVEs by last modified:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });
