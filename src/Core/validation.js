async function isValid({ schema, data }) {
    const { error, value } = schema.validate(data);

    if (error) {
        return new Error(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
    }

    return null
}

module.exports = {
    isValid
}