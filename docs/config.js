;(function (m) {
  function isUrl(input) {
    return /^https?:\/\//.test(input)
  }

  function isRepo(input) {
    return /^[\w\-]+\/[\w\-]+$/.test(input)
  }

  function updateState(ctx, repo) {
    var url = isUrl(repo) ? 
      repo :
      'https://raw.githubusercontent.com/' + repo + '/master/README.md'

    ctx.store.state.config.home = url
    if (isRepo(repo)) {
      ctx.store.state.config.title = repo
      ctx.store.state.config.repo = repo
    }
  }

  function anyDoc(ctx) {
    ctx.router.beforeEach(function (to, from, next) {
      var repo = to.query.repo || 'egoist/anydoc'
      updateState(ctx, repo)
      next()
    })
  }

  function search(ctx) {
    ctx.registerComponent('sidebar:start', {
      template: '<input @change="handleChange" class="search" placeholder="owner/repo" />',
      methods: {
        handleChange: function (e) {
          var repo = e.target.value
          ctx.router.push({query: {repo: repo}})
          updateState(ctx, repo)
          ctx.event.emit('reload')
        }
      }
    })
  }

  m.$config = {
    debug: true,
    plugins: [
      anyDoc,
      search
    ]
  }
})(self);