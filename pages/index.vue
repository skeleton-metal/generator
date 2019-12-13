<template>
  <v-container column justify-center align-center>
    <v-card>
      <v-card-title class="indigo white--text headline">
        Modules Directory
      </v-card-title>
      <v-row
        class="pa-4"
        justify="space-between"
      >
        <v-col cols="6">
          <v-treeview
            :active.sync="active"
            :items="items"
            :open.sync="open"
            activatable
            color="primary"
            transition
          >
          </v-treeview>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col
          class="d-flex text-center"
        >
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light"
              style="align-self: center;"
            >
              Select a Module
            </div>
            <v-card
              v-else
              :key="selected.id"
              class="pt-6 mx-auto"
              flat
              max-width="400"
            >
              <v-card-text>
                <v-row wrap>
                  <v-col cols="12">
                    <h2>{{selected.name}}</h2>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-row
                class="text-left"
                tag="v-card-text"
              >
                <div v-if="selected.fields">
                  <v-btn color="primary"
                         small
                         @click="editModels = true"
                  >Edit
                  </v-btn>
                  <v-list
                    two-line
                    dense
                    rounded>
                    <v-subheader>Fields:</v-subheader>
                    <v-list-item
                      v-for="(item, i) in selected.fields"
                      :key="i"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.type"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </div>
                <div v-else-if="selected.children">
                  <v-row wrap>
                    <v-col cols="12" class="text-center">
                      <v-btn color="primary"
                             small
                             @click="newModelDialog = true">Add Model
                      </v-btn>
                      <v-divider></v-divider>
                      <v-btn color="primary"
                             small
                             @click="editDialog = true"
                      >Edit
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <v-row wrap>
                    <v-col cols="12" class="text-center">
                      <h2>It doesn't have Models</h2>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-btn color="primary"
                             small
                             @click="newModelDialog = true">Add Model
                      </v-btn>
                      <v-btn color="primary"
                             small
                             @click="editDialog = true"
                      >Edit
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-row>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>

    <new-module v-if="newDialog"
                :dialog="newDialog"
                @saveForm="saveNewModule"
                @closeDialog="newDialog = false"></new-module>

    <add-models v-if="newModelDialog"
                :dialog="newModelDialog"
                @closeDialog="newModelDialog = false"
                @saveModel="saveModel"
    ></add-models>

    <edit-module v-if="editDialog"
                 :dialog="editDialog"
                 :item="selected"
                 @closeDialog="editDialog = false"
                 @editForm="editModule"></edit-module>
    <edit-models v-if="editModels"
                 :dialog="editModels"
                 :model="selected"
                 @closeDialog="editModels = false"
                 @saveModel="editModel"
    ></edit-models>
    <v-btn
      fab
      color="primary"
      bottom
      right
      absolute
      @click="newDialog = !newDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex'
    import NewModule from '../components/NewModule'
    import AddModels from '../components/AddModels'
    import EditModule from "../components/EditModule";
    import EditModels from "../components/EditModels";

    export default {
        components: {
            NewModule,
            AddModels,
            EditModule,
            EditModels
        },
        data: () => {
            return {
                items: [],
                newDialog: false,
                id: 0,
                open: [],
                active: [],
                newModelDialog: false,
                editDialog: false,
                editModels: false

            }
        },
        computed: {
            ...mapGetters(['getModules']),

            selected() {
                let r = {}
                let flag = false
                if (!this.active.length) return undefined

                const id = this.active[0]
                this.items.map(x => {
                    if (x.children) {
                        x.children.map(a => {
                            if (a.id === id) {
                                r = a
                                flag = true
                            }
                        })
                    }
                })
                if (flag)
                    return r
                else
                    return this.items.find(x => x.id === id)
            },
        },
        methods: {
            saveNewModule(data) {
                this.id += 1
                data.id = this.id
                this.items.push(data)
                this.newDialog = false
                console.log(this.items)
            },
            saveModel(model) {
                this.id += 1
                model.id = this.id
                let x = this.selected
                if (x.children) {
                    let children = x.children
                    children.push(model)
                    this.$set(x, 'children', children)
                } else {
                    let children = [model]
                    this.$set(x, 'children', children)
                }
                this.newModelDialog = false
            },
            editModule(item) {
                let x = this.selected
                x.name = item.name
                this.editDialog = false

            },
            editModel(item) {
                const id = this.active[0]
                this.items.map(x => {
                    if (x.children) {
                        x.children.map(a => {
                            if (a.id === id) {
                                this.$set(a, 'name', item.name)
                                this.$set(a, 'fields', item.fields)
                            }
                        })
                    }
                })
                this.editModels = false
            }
        },
        watch: {
            items: function (value) {
                console.log(value)
            },
            active: function (value) {
                console.log(value)
            },
            selected: function (value) {
                console.log(value)
            }
        }
    }
</script>
