<template>
  <div>
    新闻内容  {{ this.id }}
  </div>
</template>

<script>
export default{
  data(){
    return {
      id: ''
    }
  },
  methods: {
    hq(){
      // console.log(this.$route.params);
      this.id = this.$route.params.id;
    }
  },
  created(){
    this.hq();
  }
}
</script>

<style lang="sass" scope>
  
</style>