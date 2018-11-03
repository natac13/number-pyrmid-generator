import express from 'express';

import PyramidModel from '../models/pyramidData.js';

import {
  ALREADY_EXIST,
  CREATED,
  DATA_FETCH_ERROR,
  DATA_SAVE_ERROR,
  MISSING_DATA,
  NO_DOCUMENT,
  UPDATED_DOC,
} from '../utils/statuses.js';

const router = express.Router();

/*=========================================
=            PyramidData Document            =
=========================================*/
/* Create PyramidData Document. Needs a phrase and finalValue  */
router.post('/document', async (req, res, next) => {
  try {
    const { phrase, finalValue } = req.body;
    if (!phrase || !finalValue) {
      return res.status(422).json({ status: MISSING_DATA });
    }
    const query = { phrase };
    const projection = { _id: false, __v: false };
    const doc = { phrase, finalValue };
    const pyramidDataDoc = await PyramidModel.findOne(query, projection);
    if (!pyramidDataDoc) {
      const createdDoc = await PyramidModel.create(doc);
      return res.status(200).json({ doc: createdDoc, status: CREATED });
    }
    return res.status(200).json({ doc: pyramidDataDoc, status: ALREADY_EXIST });
  } catch (err) {
    const error = {
      type: DATA_SAVE_ERROR,
      location: 'server',
      ...err,
    };
    return next(error);
  }
});
/* Fetch one pyramidData document */
router.get('/doc/:phrase', async (req, res, next) => {
  const { phrase } = req.params;
  try {
    const query = { phrase };
    const projection = { _id: false, __v: false };
    const securityDoc = await PyramidModel.findOne(query, projection);
    return res.status(200).json(securityDoc);
  } catch (err) {
    const error = {
      type: DATA_FETCH_ERROR,
      location: 'server',
      ...err,
    };
    next(error);
  }
});

/* Delete a pyramidData document. */
router.delete('/:phrase', async (req, res, next) => {
  const { phrase } = req.params;
  try {
    const conditions = { phrase };
    const mongoResponse = await PyramidModel.deleteOne(conditions);
    return res.status(200).json({ deleted: true });
  } catch (err) {
    const error = { ...err };
    return next(error);
  }
});

export default router;
