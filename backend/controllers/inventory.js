const handleGetInventory = (req, res, db) => {
    // console.log(req.params.id)
    db.select('*')
        .from('medicine_inventory')
        .then(inventory => {
            if (inventory.length) res.json(inventory);
            else res.json("NO");
        })
        .catch(err => res.json(err))
}
module.exports = {
    handleGetInventory: handleGetInventory
}