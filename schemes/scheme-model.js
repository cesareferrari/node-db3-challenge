const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
}

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({id}).first();
}

function findSteps(id) {
  return db('schemes')
    .join('steps', 'schemes.id', 'steps.scheme_id')
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .where({scheme_id: id})
    .orderBy('steps.step_number');
}

async function add(scheme) {
  const [id] = await db('schemes').insert(scheme);
  return findById(id);
}

async function update(changes, id) {
  await db('schemes').where({id}).update(changes);
  return findById(id);
}

async function remove(id) {
  const scheme = await findById(id);
  await db('schemes').where({id}).del();
  return scheme;
}

function addStep(stepData, id) {
  return db('steps').insert({...stepData, scheme_id: id});
}
