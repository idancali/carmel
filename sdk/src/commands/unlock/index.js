const Command = require('../../Command')
const parse = require('url-parse')
const keytar = require('keytar')

class _ extends Command {
  constructor(args) {
    super(args)
  }

  get id() { return _.ID }
  get requiresContext() { return _.REQUIRES_CONTEXT }
  get title() { return _.TITLE }

  exec(session) {
    if (!session) {
      return Promise.reject(new Error(_.ERRORS.COULD_NOT_EXECUTE('the session is missing')))
    }

    return new Promise((resolve, reject) => {
        resolve()
    })
  }
}

_.ERRORS = Object.assign({}, _.ERRORS, {})
_.REQUIRES_CONTEXT = false
_.TITLE = "Unlocking"
_.ID = 'unlock'

module.exports = _