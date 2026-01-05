# Student Report Card Automation

## Problem
Preparing student report cards manually is repetitive, time-consuming, and error-prone.
Data is usually stored in spreadsheets, then copied into documents and exported manually.

## Solution
This project automates the complete report card generation process using a trigger-based workflow.

When student data is added or updated in Google Sheets:
- Data is validated and structured
- A dynamic HTML report card is generated
- The report is converted to PDF
- The PDF is automatically stored in Google Drive

## Tech Stack
- Python
- n8n (workflow automation)
- Google Sheets API
- HTML, JavaScript
- Google Drive API

## Workflow Overview
1. Google Sheets acts as the data source
2. n8n monitors changes using a trigger
3. Data is processed and mapped
4. HTML template is populated dynamically
5. PDF is generated
6. File is uploaded to Google Drive

## Demo
- Screenshots available in the `screenshots/` folder

## Repository Contents
- `n8n/report_card_flow.json`: Exported n8n workflow
- `templates/report_card.html`: Dynamic HTML report card template
- `sample-data/students_sample.csv`: Sample input data
- `screenshots/`: Workflow, execution, and output proof

## How to Run (High Level)
1. Import the workflow JSON into n8n
2. Configure Google Sheets and Drive credentials
3. Update sample sheet data
4. Trigger workflow and generate PDF

> Note: All data used is sample data. No real student information is included.
