<template>
  <div class="container">
    <editor
      ref="aceEditor"
      @init="editorInit"
      height="350"
      lang="json"
      :theme="theme"
      :options="{
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
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
  components: {
    editor: require("vue2-ace-editor")
  },
  methods: {
    editorInit() {//初始化
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/"+this.$props.language); //language
      // require("brace/theme/tomorrow_night");
      require("brace/theme/"+this.$props.theme);
      require("brace/snippets/"+this.$props.language); //snippet
      this.$refs.aceEditor.editor.setValue(this.$props.value)

    },
  },
  mounted() {
    this.editorInit();
  }
};

</script>
