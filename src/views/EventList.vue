<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
export default {
  name: 'EventList',
  components: {
    EventCard
  },
  computed: {
    events() {
      return this.$store.state.events
    }
  },
  created() {
    // EventService.getEvents()
    //   .then(response => {
    //     this.events = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })          MOVED to store action AND added below dispatch
    this.$store.dispatch('fetchEvents').catch(error => {
      this.$router.push({
        name: 'ErrorDisplay',
        params: { error: error }
      })
    })
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
