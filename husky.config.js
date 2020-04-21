module.exports = {
    hooks: {
        "pre-commit": "yarn lint && yarn format && yarn test"
    }
}