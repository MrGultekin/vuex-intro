import { createStore } from 'vuex'
import EventService from '@/services/EventService'

export default createStore({
  state: {
    user: 'Mustafa Rosenthal',
    events: [],
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          // this.events = response.data
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // add below state arg,create a const existing,
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(event => event.id === id)
      if (existingEvent) {
        commit('SET_EVENTS', existingEvent)
      } else {
        EventService.getEvent(id)
          .then(response => {
            // this.event = response.
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  },
  modules: {}
})
