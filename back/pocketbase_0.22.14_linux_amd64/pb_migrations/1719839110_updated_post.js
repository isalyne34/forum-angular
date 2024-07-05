/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wv6h1ac64ir4rd8")

  collection.updateRule = "@request.auth.id=created_by.id"
  collection.deleteRule = "@request.auth.id=created_by.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wv6h1ac64ir4rd8")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
