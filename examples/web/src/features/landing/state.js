import zbx from '@z1/lib-feature-box'

// main
export const state = zbx.state.create('landing', [
  {
    intial: {},
    // mutations(m) {
    //   return []
    // },
    routes(r) {
      return [r('/', 'routeHome', state => state)]
    },
    // guards(g, { actions, mutators }) {
    //   return []
    // },
    // effects(fx, { actions, mutators }) {
    //   return []
    // },
  },
])