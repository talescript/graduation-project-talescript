<script>
import { mapActions } from 'pinia'
import { eventStore } from '@/stores/event'
import formattedDate from '../lib/time.js'

export default {
  name: 'EventsView',
  data() {
    return {
      event: null
    }
  },
  async created() {
    this.event = await this.fetchEvent(this.$route.params.id)
  },
  methods: {
    ...mapActions(eventStore, ['fetchEvent', 'joinEvent', 'leaveEvent']),

    // create button for leaving event
    // add leave event method
    async join(id) {
      await this.joinEvent(id)
      this.event.attendees.push(this)
    },
    async leave(id) {
      await this.leaveEvent(id)
      this.event.attendees.pop(this)
    }
  },
  mixins: [formattedDate],
  computed: {
    formattedDate() {
      return this.formatDate(this.date)
    }
  }
}
</script>
<template>
  <h2>Event detail page</h2>
  <div v-if="!event">
    <p>Loading.....</p>
  </div>
  <div v-else>
    <h2>{{ event.title }}</h2>
    <ul>
      <li>{{ event.description }}</li>
      <li>{{ event.location }}</li>
      <li>{{ formatDate(event.date) }}</li>
    </ul>
    <div class="grid">
      <button @click="join(event._id)">Join</button>
      <button class="secondary" @click="leave(event._id)">Leave</button>
    </div>
    <h2>Attendees</h2>
    <template v-for="attendee in event.attendees" :key="attendee._id">
      <article>{{ attendee.name }}</article>
    </template>
  </div>
</template>
