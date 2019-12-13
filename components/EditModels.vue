<template>
  <v-dialog
    v-model="dialog"
    width="800"
    persistent
  >
    <v-card>
      <v-card-title class="pl-4">
        <span class="title">Edit Model</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="" autocomplete="off" v-model="valid">
          <v-row>
            <v-col cols="6" md="8">
              <v-text-field
                prepend-icon="title"
                name="name"
                label="Name"
                type="text"
                v-model="form.name"
                placeholder="Name"
                :rules="[v => !!v || 'Name is required']"
                required
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on">Add Field</v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <v-form ref="formField" @keyup.enter.native="addField" autocomplete="off" v-model="validField">
                      <v-row>
                        <v-col cols="6" md="6">
                          <v-text-field
                            prepend-icon="title"
                            name="name"
                            label="Name"
                            type="text"
                            v-model="formField.name"
                            placeholder="Name"
                            required
                          />
                        </v-col>
                        <v-col cols="6" md="6">
                          <v-select
                            :items="types"
                            v-model="formField.type"
                            label="Type"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">Type</th>
                  <th class="text-left"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in form.fields" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.type }}</td>
                  <td>
                    <v-icon @click="deleteField(item)">delete</v-icon>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
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
    import cloneByJsonCopy from '../helpers/cloneByJsonCopy'

    export default {
        name: "EditModels",
        props: {
            dialog: Boolean,
            model: Object
        },
        data: () => {
            return {
                valid: false,
                form: {
                    name: "",
                    fields: [{name: "id", type: "id"}]
                },
                menu: false,
                validField: false,
                formField: {
                    name: "",
                    type: ""
                },
                types: ["String", "Int"]
            }
        },
        methods: {
            addField() {
                this.form.fields.push(this.formField)
                this.formField = {
                    name: "",
                    type: ""
                }
            },
            deleteField(item) {
                console.log(item)
                this.form.fields.splice(this.form.fields.indexOf(item), 1);

            },
            saveForm() {
                if (this.$refs.form.validate()) {
                    this.$emit('saveModel', this.form)
                }
            }
        },
        mounted() {
            this.form = cloneByJsonCopy(this.model);
        }
    }
</script>

<style scoped>

</style>
