module.exports = {
    hooks: {
        "pre-commit": "yarn format && yarn lint && yarn test"
    }
}