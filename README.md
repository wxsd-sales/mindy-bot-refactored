# Mindy Bot (Out)

Mindy Bot Out, gets a post request once the responder starts a session. On getting the post request, Mindy Bot creates a new space, generates JWT token to both requester and responder, adds requester and responder to the space created and generate a response link and send it as the post resquest response and also to the soap box as a request.

### Usage

One can use the Mindy Bot by sending a post request to

```
curl --location --request POST 'https://mindy.wbx.ninja/virtual-nurse-request' \
--header 'Content-Type: application/json' \
--data-raw '{
    "guid":"123",
    "labels":
    {
        "responder":"Responder Nurse",
        "requester":"Requester Nurse"
    }
}'
```

and the response contains the response URL, which looks like:

```
{
    "redirect": "https://wxsd.wbx.ninja/guest?headerToggle=false&destination=Y2lzY29zcGFyazovL3VzL1JPT00vNWQxYjU0MTAtMDg2My0xMWVkLTkzZDItOTllNWQ0Mm&userType=licensed&token=YTFlM2Q3NjQtMDYxMC00YzM1LWFjODktNDNlOWM1OTc5MGRlNTk5ZTA5NmEtMTU5_PF84_578771dd-81f7-42d6-9dbb"
}

```

### Setup

Open a new terminal window and follow the instructions below to setup the project locally for development/demo.

1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/mindy-bot-refactored.git && cd mindy-bot-refactored
   ```

2. Copy `.env.example` file as `.env`:
   ```
   cp .env.example .env
   ```

You will need to add values to **.env** file:

```
WEBEX_API_URL=https://webexapis.com/v1
NINJA_API_URL=https://wxsd.wbx.ninja
SOAPBOX_API_URL=https://soapbox.wbx.ninja
WEBEX_ACCESS_TOKEN=
WEBEX_ORG_ID=
WEBEX_TEAM_ID=
WEBEX_JWT_SECRET=
PORT=
```
Note:

1. You will need to provide a PORT for this to run locally, if left empty, it runs on port 3000
2. Review and follow the [Creating a Webex Bot](https://developer.webex.com/docs/bots#creating-a-webex-bot) guide.
   Take note of your Bot access token. Assign this value to the `WEBEX_BOT_TOKEN` environment variable.
3. Review and follow the [Create a Guest Issuer app on Webex](https://developer.webex.com/docs/guest-issuer#guest-issuer-app) guide.
   Take note of your Guest Issuer ID and Shared Secret. Assign these values to the `WEBEX_ORG_ID`
   and `WEBEX_JWT_SECRET` environment variables respectively.
4. You can [create a team](https://developer.webex.com/docs/api/v1/teams/create-a-team) by following the link. Take a note of id returned in the response and assign it to `WEBEX_TEAM_ID` environment variable.

### Install

The typical npm install flow, after the setup

```
npm install
npm start
```
