<template>
  <v-container>
    <div ref="editor"></div>
  </v-container>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

export default {
  props: {
    docId: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editor: null,
      provider: null
    };
  },
  mounted() {
    const ydoc = new Y.Doc();
    this.provider = new WebsocketProvider(
      //"ws://localhost:8099",
      "wss://demos.yjs.dev",
      this.docId,
      ydoc
    );
    const ytext = ydoc.getText("quill");

    this.editor = new Quill(this.$refs.editor, {
      modules: {
        cursors: true,
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"]
        ],
        history: {
          userOnly: true
        }
      },
      placeholder: "Start collaborating...",
      theme: "snow" // or 'bubble'
    });

    new QuillBinding(ytext, this.editor, this.provider.awareness);

    // Define user name and color
    // Check the quill-cursors package on how to change the way cursors are rendered
    this.provider.awareness.setLocalStateField("user", {
      name: this.user.name,
      color: this.user.cursorColor
    });

    this.editor.on("text-change", () => this.update());
  },
  beforeDestroy() {
    this.provider.disconnect();
  },
  methods: {
    update() {
      //console.log(">> text", this.editor.getText());
    }
  }
};
</script>
