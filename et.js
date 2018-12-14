"use strict"

// npm
const fast = require("fast-json-stable-stringify")

// core
const { createHash } = require("crypto")
const assert = require("assert").strict

// self
// const pages = require("./pages.json")
const pages = require("./p-revved-v1.json")

/*
const pStr = fast(pages)

console.log(pStr)
*/

const makeRev = ({ _created, _updated, _id, _rev, ...rest }) => {
  const h = createHash("md5")
  h.update(fast(rest))
  const n = rest._rev ? rest._rev.split("-")[0] : 0
  return `${n + 1}-${h.digest("base64")}`
}

/*
const p2 = []
let _id
for (_id in pages) {
  p2.push({ ...pages[_id], _id, _rev: makeRev(pages[_id]) })
}

console.log(JSON.stringify(p2, null, '  '))
*/

const updateRev = (page) => ({ ...page, _rev: makeRev(page) })

/*
const pp = pages[0]

console.log('pp:', JSON.stringify(pp, null, '  '))

const pp2 = updateRev(pp)

console.log('pp2:', JSON.stringify(pp2, null, '  '))

const pp3 = updateRev({ ...pp, title: 'boop boop' })

console.log('pp3:', JSON.stringify(pp3, null, '  '))
*/

class DocsDb {
  constructor(docs = []) {
    this.db = new Map(docs)
  }

  // makeRev ({ _created, _updated, _id, _rev, ...rest }) {
  makeRev(doc) {
    const h = createHash("md5")
    h.update(fast(rest))
    const n = rest._rev ? rest._rev.split("-")[0] : 0
    return `${n + 1}-${h.digest("base64")}`
  }

  updateDoc(id, newDoc) {
    const doc = this.db.get(id)
    console.log("doc:", doc)
    const newDocRev = makeRev(newDoc)
    console.log("newDocRev:", newDocRev)
    const _created = new Date().toISOString()
    const _updated = _created
  }
}

const db = new DocsDb()
db.updateDoc("joe", { fee: 42 })

/*
const updateDoc = async (_id, newDoc, oldDoc = {}) => {
  assert(newDoc, 'newdoc is required')
  assert.equal(typeof newDoc, 'object', 'newDoc must be an object')
  assert.equal(typeof oldDoc, 'object', 'oldDoc must be an object')

  const oldDocRev = makeRev(oldDoc)
  console.log(oldDocRev, oldDoc)

  const nd2 = { ...oldDoc, ...newDoc }
  const newDocRev = makeRev(nd2)
  console.log(newDocRev, nd2)

  // assert.strictEqual(typeof newDoc._id, 'string', '_id field required and must be a string')
  const _created = new Date().toISOString()
  const _updated = _created
  return updateRev({ _created, ...oldDoc, ...newDoc, _updated })
  // return doc
}

updateDoc(
  'joe',
  { si: undefined },
  { si: 42 },
)
  .then(console.log)
  .catch(console.error)
*/
