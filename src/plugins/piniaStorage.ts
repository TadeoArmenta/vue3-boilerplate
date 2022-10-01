import type { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import localforage from 'localforage'
import logger from '@/utils/logger'

export const pinia = createPinia()
export const installStorage: Plugin = (app) => {
  logger.info('installStorage plugin instanciated')
  localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'HordePlayer',
    version: 1.0,
    storeName: 'hordeplayer', // Should be alphanumeric, with underscores.
    description: 'HordePlayer portal storage'
  })
  pinia.use(
    createPersistedStatePlugin({
      storage: {
        getItem: async (key) => {
          return localforage.getItem(key)
        },
        setItem: async (key, value) => {
          return localforage.setItem(key, value)
        },
        removeItem: async (key) => {
          return localforage.removeItem(key)
        },
      },
    }),
  )
  app.use(pinia)
}
