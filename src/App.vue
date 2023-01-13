<template>
  <b-container fluid class="pt-1 pb-2">

  </b-container>

  <b-container fluid>
    <b-row>
      <b-col>
        <b-list-group>
          <b-list-group-item>
            <b-button variant="outline-primary" @click="addNewTokenShowClick">
              <i-mdi-add/>
              add new
            </b-button>
          </b-list-group-item>
          <b-list-group-item v-if="tokenAddVisible">
              <b-form-input v-model="newTokenData.owner" type="text" placeholder="owner" class="my-1"/>
              <b-form-input v-model="newTokenData.token" type="text" placeholder="token" class="my-1"/>
              <b-button variant="outline-success" @click="addNewTokenClick">
                <i-mdi-add/>
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
              <b-button variant="outline-danger" @click="deleteTokenClick(item)">
                <i-mdi-delete-outline/>
              </b-button>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import _ from 'lodash'

export default {
  data() {
    return {
      tokenReprs: [],
      tokenAddVisible: false,
      newTokenData: {
        owner: '',
        token: '',
      }
    }
  },
  methods: {
    async getTokensList() {
      const tokenReprs = await this.axios.get('vk-tokens/safe/')
      return tokenReprs.data
    },
    async addNewTokenShowClick() {
      this.tokenAddVisible = !this.tokenAddVisible
    },
    async addNewTokenClick() {
      this.tokenAddVisible = !this.tokenAddVisible
      const dto = this.newTokenData
      await this.axios.put('vk-tokens/', dto)
      await this.updateTokenList()
    },
    async deleteTokenClick(item) {
      const dto = {owner: item.owner}
      await this.axios.delete('vk-tokens/', {data: dto})
      await this.updateTokenList()
    },
    async updateTokenList() {
      const {tokenReprs} = await this.getTokensList()
      this.tokenReprs = tokenReprs
    }
  },
  async mounted() {
    await this.updateTokenList()
  },
}

</script>

<style scoped>
strong {
  font-weight: bold;
}
</style>
