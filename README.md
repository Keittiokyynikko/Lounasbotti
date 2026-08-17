# Lounasbotti (Lunch Bot)

Thesis project for my software developer studies

> Note: This app was created years before GenAI

## Workflow

**1. Request for the app**

Cronjob in the server runs the main function of the app

**2. Data Scrape**

Depending on restaurant the app uses different tools (Puppeteer, Axios) to scrape menu data from restaurant's site

**3. Message formatting**

App collects data and builds properly formatted messages using **Slack Block Kit**

**4. Attaching the greeting**

One of the prewritten greetings is randomly selected and attached to formatted message

**5. Sending message**

Using **Slack API** the app sends message to Slack channel of workspace
