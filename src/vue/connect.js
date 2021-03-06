import microstate from 'microstates'
import { map } from 'funcadelic'

export default function connect(Model, Component) {
  return {
    ...Component,
    data() {
      let props = Object.keys(Component.props).reduce((acc, prop) => ({ ...acc, [prop]: this[prop] }), {})
      return {
        microstate: microstate(Model, props),
        ...((Component.data && Component.data()) || {})
      }
    },
    computed: {
      model() {
        return this.microstate.state
      },
      actions() {
        return map(transition => (...args) => (this.microstate = transition(...args)), this.microstate)
      }
    }
  }
}
