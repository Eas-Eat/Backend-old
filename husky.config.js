module.exports = {
    hooks: {
        "pre-commit": "yarn prettier && yarn lint && yarn test"
    }
}