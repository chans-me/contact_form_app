<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span class="headline">
        Contact Form App
      </span>
    </v-app-bar>
    <v-main>
      <ContactForm/>
    </v-main>
  </v-app>
</template>

<script>
import ContactForm from './components/ContactForm';

export default {
  name: 'App',
  components: {
    ContactForm,
  },
  data() {
    return {};
  },
};
</script>
