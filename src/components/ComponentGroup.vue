<template>
  <div class="widget">
    <div class="widget-cate">{{ title }}</div>
    <div class="widget-list">
      <Draggable 
        :list="list"
        :options="{group:{name: 'formdrag',pull:'clone',put:false}}"
        :sort=false
        animation="300"
        >
          <transition-group>
              <div class="widget-c" v-for="listitem in list" :key="listitem.type">
                  <SvgIcon :iconClass="listitem.type" />
                  <span>{{ listitem.label }}</span>
              </div>
          </transition-group>
      </Draggable>
    </div>
    
  </div>
  
</template>

<script>
import { defineComponent, PropType } from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from './SvgIcon.vue'

export default defineComponent({
  name: 'ComponentGroup',
  components: {
    Draggable,
    SvgIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      required: true
    }
  }
})
</script>

<style lang="less" scoped>
.widget-cate{
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 14px;
}
.widget-list{
    box-sizing: border-box;
  overflow: hidden;
  .widget-c{
    font-size: 12px;
    float: left;
    padding: 8px 10px;
    border-radius: 5px;
    margin: 0 10px 10px 0;
    cursor: all-scroll;
    background-color: aliceblue;
    color: #555555;
    display: flex;
    align-items: center;
    &:hover{
      outline: 2px solid rgb(222, 237, 251);
      outline-offset: -2px;
    }
    .svg-icon{
      margin-right: 6px;
      margin-left: 8px;
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

</style>