<template>
  <div class="widget-item">
    <component
      class="widget-view"
      :class="{ active: selectWidget?.key === element.key }"
      :is="element.type+'Item'"
      :model.sync="model"
      :disabled="false"
      :key="element.key"
      :element="element"
      :config="config"
    />
    <div class="widget-item-action" v-if="selectWidget?.key === element.key">
      <i class="el-icon-document-copy" @click.stop="$emit('copy')"></i>
      <i class="el-icon-delete" @click.stop="$emit('delete')"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent, PropType } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import inputItem from '@/components/ElGeneratorForm/input.vue';
  import selectItem from '@/components/ElGeneratorForm/select.vue';
  import radioItem from '@/components/ElGeneratorForm/radio.vue';
  import checkboxItem from '@/components/ElGeneratorForm/checkbox.vue';
  import timeItem from '@/components/ElGeneratorForm/time.vue';
  import dateItem from '@/components/ElGeneratorForm/date.vue';
  import numrangeItem from '@/components/ElGeneratorForm/numrange.vue';
  import rateItem from '@/components/ElGeneratorForm/rate.vue';
  import switchItem from '@/components/ElGeneratorForm/switch.vue';
  import sliderItem from '@/components/ElGeneratorForm/slider.vue';
  import textItem from '@/components/ElGeneratorForm/text.vue';
  import imageItem from '@/components/ElGeneratorForm/image.vue';
export default defineComponent({
  name: 'ElWidgetFormItem',
  components: {
    SvgIcon,
    inputItem,
    selectItem,
    radioItem,
    checkboxItem,
    timeItem,
    dateItem,
    numrangeItem,
    rateItem,
    switchItem,
    sliderItem,
    textItem,
    imageItem,
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    selectWidget: {
      type: Object
    }
  },
  emits: ['copy', 'delete'],
  data(){
    return {
      model:{}
    }
  },
  methods:{
    initPreviewSrcList(url,list){
      let newList = [];
      list.forEach(item=>{
        if(item.url !== url){
          newList.push(item.url)
        }
      })
      newList.unshift(url);
      return newList;
    }
  }
})
</script>
