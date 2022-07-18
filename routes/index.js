// var express = require("express");
import express from 'express';
// const getJWT = require("../utils/webex/jwt");
import generateJWT from '../utils/webex/generate-jwt.js';
import getPersonID from '../utils/webex/person-details.js';
import createRoom from '../utils/webex/create-room.js';
import createMembership from '../utils/webex/create-membership.js';
import createResponseLink from '../utils/webex/create-response-link.js';
import sendSoapboxRequest from '../utils/webex/send-soapbox-request.js';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/virtual-nurse-request', async function (req, res) {
  console.info(new Date().toUTCString(), req.body);
  const getNurseLink = (type, roomId) =>
    generateJWT(type)
      .then((r) => r.json())
      .then((r) => Promise.all([r.token, getPersonID()]))
      .then(([accessToken, personId]) =>
        Promise.all([accessToken, createMembership(personId, roomId), createResponseLink(accessToken, roomId)])
      );

  const roomId = createRoom(process.env.WEBEX_TEAM_ID);

  const virtualNurseLink = roomId
    .then((s) => getNurseLink('Virtual Nurse', s))
    .then(([accessToken, membership, responseLink]) => responseLink);
  const gradNurseLink = roomId
    .then((s) => getNurseLink('Grad Nurse', s))
    .then(([accessToken, membership, responseLink]) => sendSoapboxRequest(req.body.guid, responseLink));

  return Promise.all([virtualNurseLink, gradNurseLink])
    .then(([linkResponse, _]) => res.json({ redirect: linkResponse }))
    .catch(async (e) => {
      console.log(e);
      console.log(await e.json());
      res.status(500).json({ error: e });
    });
});

export default router;
