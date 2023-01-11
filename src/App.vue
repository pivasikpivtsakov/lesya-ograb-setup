<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item>
            <b-button variant="outline-primary">
              <icon-add/>
              add new
            </b-button>
          </b-list-group-item>
          <b-list-group-item v-for="item of tokenReprs"
                             class="d-flex justify-content-between">
            <div class="d-flex align-items-center">
              <strong class="flex-grow-0 me-2">{{ item.id }}</strong>
              <span class="flex-grow-1">{{ item.owner }}</span>
            </div>
            <div class="d-flex">
              <b-button variant="outline-danger">
                <icon-delete/>
              </b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import IconDelete from '@/components/icons/IconDelete.vue'
import IconAdd from '@/components/icons/IconAdd.vue'

export default {
  components: {IconAdd, IconDelete},
  data() {
    return {
      tokenReprs: [],
    }
  },
  methods: {
    async getTokensList() {
      try {
        const tokenReprs = await this.axios.get('vk-tokens/safe/')
        console.log(tokenReprs)
        return tokenReprs.data
      } catch (e) {
        alert('не могу достучаться до сервера')
        console.error(e)
      }
    },
  },
  async mounted() {
    const {tokenReprs} = await this.getTokensList()
    this.tokenReprs = tokenReprs
  },
}

</script>

<style scoped>
strong {
  font-weight: bold;
}
</style>
