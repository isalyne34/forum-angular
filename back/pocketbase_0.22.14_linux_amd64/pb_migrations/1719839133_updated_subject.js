/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k79eiso1st105pe")

  collection.updateRule = "@request.auth.id=created_by.id"
  collection.deleteRule = "@request.auth.id=created_by.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k79eiso1st105pe")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
