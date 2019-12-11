<template>
  <v-dialog
    v-model="dialog"
    width="500"
    persistent
  >
    <v-card>
      <v-card-title class="pl-4">
        <span class="title">Edit Modulo</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="" @keyup.enter.native="$emit('editForm', form)" autocomplete="off"
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
          @click="$emit('editForm', form)"
        >
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
    import cloneByJsonCopy from '../helpers/cloneByJsonCopy'

    export default {
        name: "EditModule",
        props: {
            dialog: Boolean,
            item: Object
        },
        data: () => {
            return {
                form: {
                    name: ""
                },
                valid: false
            }
        },
        mounted() {
            this.form = cloneByJsonCopy(this.item);
        }
    }
</script>

<style scoped>

</style>
