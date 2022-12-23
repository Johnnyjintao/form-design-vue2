<template>
  <div class="container">
    <editor
      ref="aceEditor"
      v-model="model"
      @init="editorInit"
      height="350"
      lang="json"
      :theme="theme"
      :options="{
        tabSize:6,
        fontSize:14,
      }"
    ></editor>
  </div>
</template>

<script >
export default {
  data() {
    return {
      model:""
    };
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'javascript'
    },
    theme: {
      tyle: String,
      default: 'github'
    },
  },
  watch:{
    value(val){
      console.log("111")
      this.$refs.aceEditor.editor.setValue(val)
      this.$refs.aceEditor.editor.clearSelection()
      this.model = this.$props.value;
    },
  },
  components: {
    editor: require("vue2-ace-editor")
  },
  methods: {
    getData(){
      return this.model;
    }, 
    editorInit() {//初始化
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/"+this.$props.language); //language
      require("brace/theme/tomorrow_night");
      require("brace/theme/"+this.$props.theme);
      require("brace/snippets/"+this.$props.language); //snippet
      this.$refs.aceEditor.editor.setValue(this.$props.value)
      this.$refs.aceEditor.editor.clearSelection()
      this.model = this.$props.value;
    },
  },
  mounted() {
    this.editorInit();
  }
};

</script>
