import { sync } from 'vuex-router-sync'

export default function ({ store, app: { router } }) {
  sync(store, router)
}
