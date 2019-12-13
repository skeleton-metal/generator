<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title class="pl-4">
        <span class="title">Add Modulo</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="" @keyup.enter.native="$emit('saveForm', form)" autocomplete="off"
                lazy-validation
                v-model="valid">
          <v-row>
            <v-col cols="12" md="12" sm="6">
              <v-text-field
                prepend-icon="title"
                name="name"
                label="Name"
                type="text"
                v-model="form.name"
                placeholder="Name"
                required
                :rules="[v => !!v || 'Name is required']"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          text
          @click="$emit('closeDialog')"
        >
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="saveForm"
        >
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    export default {
        name: "NewModule",
        props: {
            dialog: Boolean
        },
        data: () => {
            return {
                form: {
                    name: ""
                },
                valid: false,
            }
        },
        methods: {
            saveForm() {
                if (this.$refs.form.validate()) {
                    this.$emit('saveForm', this.form)
                }
            }
        }
    }
</script>

<style scoped>

</style>
