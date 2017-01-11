<template lang="pug">
.btn(@click="handleClick" v-bind:style="styleObject")
  div(
    v-bind:class="classObject"
    )
    span
      slot(name="buttonTitle") &nbsp;
</template>

<script>
  export default {
    name: "Vbutton",
    props: {
      type: {
        type: String,
        default: 'default'
      },
      width:{
        type: String
      }
    },
    data(){
      return {
        classObject:[
          this.type ? `btn-${this.type}` : '',
        ],
        styleObject:{
          'width':this.width
        }
      }
    },
    methods:{
      handleClick(evt){
        this.$emit('click', evt)
      }
    }
  }
</script>

<style scoped lang="stylus" src="../stylus/components/button.styl"></style>
