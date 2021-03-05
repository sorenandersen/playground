<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import Quill from "quill";

export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      editor: null
    };
  },

  mounted() {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline"]
        ]
      },
      theme: "snow",
      formats: ["bold", "underline", "header", "italic"]
    });

    this.editor.root.innerHTML = this.value;

    // We will add the update event here
    //this.editor.on('text-change', () => {});
    this.editor.on("text-change", () => this.update());
  },

  methods: {
    update() {
      console.log(">> text", this.editor.getText());
      this.$emit(
        "input",
        this.editor.getText() ? this.editor.root.innerHTML : ""
      );
    }
  }
};
</script>

<template>
  <div ref="editor" v-html="value"></div>
</template>
