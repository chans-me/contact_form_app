<template>
  <v-container>
    <v-row justify="center" class="mt-2">
      <v-col cols="12" class="col-sm-10 col-md-8 col-lg-8 rounded-lg">
        <v-card flat>
          <v-form ref="form" v-model="form" @submit.prevent="submit">
          <v-card-text class="pa-0">
            <v-row>
              <v-col cols="12" class="col-md-6 col-lg-6 py-0"
                id="nameField">
                <v-text-field
                  prepend-inner-icon="mdi-account"
                  v-model="contactForm.name"
                  label="Name*"
                  placeholder="Enter Name"
                  outlined
                  required
                  counter="50"
                  :rules="[rules.required, rules.length(5, 50), rules.name]"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="col-md-6 col-lg-6 py-0"
                id="emailField">
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  v-model="contactForm.email"
                  label="Email*"
                  placeholder="Enter Email"
                  outlined
                  required
                  :rules="[rules.required, rules.email]"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="py-0"
                id="subjectField">
                <v-text-field
                  v-model="contactForm.subject"
                  label="Subject"
                  placeholder="Enter Subject(Optional)"
                  outlined
                  counter="100"
                  :rules="[rules.length(0, 100)]"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="py-0"
                id="messageField">
                <v-textarea
                  v-model="contactForm.message"
                  outlined
                  label="Message*"
                  placeholder="Enter Message"
                  required
                  counter="500"
                  :rules="[rules.required, rules.length(0, 500)]"
                  clearable
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn 
              large color="primary"
              :loading="loading"
              :disabled="loading"
              @click="submitForm"
            >
              Submit
            </v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="alert.show" :color="alert.status"
      bottom right>
      {{alert.message}}
      <template v-slot:action="{ attrs }">
        <v-btn icon
          v-bind="attrs"
          @click="alert.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    name: 'contact_form',
    data() {
      let tempForm = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };

      return {
        contactForm: Object.assign({}, tempForm),
        defaultForm: Object.assign({}, tempForm),
        form: false,
        loading: false,
        alert: {
          show: false,
          status: "",
          message: "",
        },
        rules: {
          required: v => !!v || 'This field is required',
          length: (len, max) => v => ((v.trim() || '').length >= len && (v.trim() || '').length <= max) || `Invalid character length, required ${len} - ${max}`,
          name: v => /^[\w\s\-_]{5,50}$/.test(v) || 'Allowed characters 0-9 a-z A-Z - _',
          email: v => ((!!v && !!(String(v || '').match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)))) || 'Please enter a valid email', 
        },
      };
    },
    methods: {
      submitForm() {
        if (!this.$refs.form.validate()) return;
        this.loading = true;
        this.$http.post('https://615b56ab4a360f0017a815d1.mockapi.io/api/create', {
          ...this.contactForm
        }).then(response => {
          console.log(response);
          this.loading = false;
          this.alert = {
            show: true,
            status: "success",
            message: "Contect created successfully"
          };
          this.contactForm = Object.assign({}, this.defaultForm);
          this.$refs.form.resetValidation();
        }).catch(err => {
          console.log(err);
          this.loading = false;
          this.alert = {
            show: true,
            status: "error",
            message: err.message
          };
        });
      },
    },
  };
</script>