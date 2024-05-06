document.addEventListener('DOMContentLoaded', () => {
    const cveDetailsDiv = document.getElementById('cve-details');

    function fetchCVEDetails(id) {
        fetch(`http://localhost:3000/api/fetchCVEDetails?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(cveData => {
                updateCVEDetails(cveData);
            })
            .catch(error => console.error('Error fetching CVE details:', error));
    }

    function updateCVEDetails(cveData) {

        const cveId = cveData._id;
        const description = cveData.cve.descriptions.find(desc => desc.lang === 'en').value;

        const cvssV2Metrics = cveData.cve.metrics.cvssMetricV2[0].cvssData;
        const severity = cveData.cve.metrics.cvssMetricV2[0].baseSeverity;
        const score = cvssV2Metrics.baseScore;
        const vectorString = cvssV2Metrics.vectorString;
        const accessVector = cvssV2Metrics.accessVector;
        const accessComplexity = cvssV2Metrics.accessComplexity;
        const authentication = cvssV2Metrics.authentication;
        const confidentialityImpact = cvssV2Metrics.confidentialityImpact;
        const integrityImpact = cvssV2Metrics.integrityImpact;
        const availabilityImpact = cvssV2Metrics.availabilityImpact;


        const exploitabilityScore = cveData.cve.metrics.cvssMetricV2[0].exploitabilityScore;
        const impactScore = cveData.cve.metrics.cvssMetricV2[0].impactScore;

        const cpeData = cveData.cve.configurations[0].nodes[0].cpeMatch[0];
        const criteria = cpeData.criteria;
        const matchCriteriaId = cpeData.matchCriteriaId;
        const vulnerable = cpeData.vulnerable;


        cveDetailsDiv.innerHTML = `
        <h1>${cveId}</h1>
        <h2>Description</h2>
<p>${description}</p>

    <h2>CVSS V2 Metrics:</h2>
    <p><strong>Severity:</strong> ${severity}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Score:</strong> ${score}</p>

    <p><strong>Vector String:</strong> ${vectorString}</p>
    <table>
        <thead>
            <tr>
                <th>Access Vector</th>
                <th>Access Complexity</th>
                <th>Authentication</th>
                <th>Confidentiality Impact</th>
                <th>Integrity Impact</th>
                <th>Availability Impact</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${accessVector}</td>
                <td>${accessComplexity}</td>
                <td>${authentication}</td>
                <td>${confidentialityImpact}</td>
                <td>${integrityImpact}</td>
                <td>${availabilityImpact}</td>
            </tr>
        </tbody>
    </table>

    <h2>Scores:</h2>
    <ul>
        <li><strong>Exploitability Score:</strong> ${exploitabilityScore}</li>
        <li><strong>Impact Score:</strong> ${impactScore}</li>
    </ul>

    <p><strong>CPE:</strong></p>
    <table>
        <thead>
            <tr>
                <th>Criteria</th>
                <th>Match Criteria ID</th>
                <th>Vulnerable</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${criteria}</td>
                <td>${matchCriteriaId}</td>
                <td>${vulnerable}</td>
            </tr>
        </tbody>
    </table>
`;



        cveDetailsDiv.innerHTML = htmlContent;
    }


    const urlParams = new URLSearchParams(window.location.search);
    const cveId = urlParams.get('id');
    if (cveId) {

        fetchCVEDetails(cveId);
    } else {
        cveDetailsDiv.innerHTML = '<p>Error: CVE ID not provided.</p>';
    }
});
