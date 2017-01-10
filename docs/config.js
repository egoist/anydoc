;(function (m) {
  function isUrl(input) {
    return /$https?:\/\//.test(input)
  }

  function isRepo(input) {
    return /^[\w\-]+\/[\w\-]+$/.test(input)
  }

  function anyDoc(ctx) {
    ctx.router.beforeEach(function (to, from, next) {
      var repo = to.query.repo || 'egoist/anydoc'
      var url = isUrl(repo) ? 
        repo :
        'https://raw.githubusercontent.com/' + repo + '/master/README.md'

      ctx.store.state.config.home = url
      if (isRepo(repo)) {
        ctx.store.state.config.title = repo
        ctx.store.state.config.repo = repo
      }
      next()
    })
  }

  m.$config = {
    debug: true,
    plugins: [
      anyDoc
    ]
  }
})(self);