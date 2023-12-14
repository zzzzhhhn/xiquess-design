<template>
  <div class="xq-mini-editor">
    <div
      :placeholder="placeholder"
      ref="editor-content"
      class="xq-editor-content"
      contentEditable="true"
      @input="onChange"
      @paste="onPaste"
      @compositionstart="onCompositionstart"
      @compositionend="onCompositionend"
      @keydown.enter.stop="onEnter"
      @keyup="onKeyUp"
      @click="onClick"
    ></div>
  </div>
</template>

<script>
export default {
  name: "XqEditor",
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
  data: () => ({
    typing: false,
    lastEditRange: "",
  }),
  mounted() {
    this.$emit("onReady");
  },
  methods: {
    focus() {
      this.$refs["editor-content"].focus();
    },
    blur() {
      this.$refs["editor-content"].blur();
    },
    isEmpty() {
      let text = this.$refs["editor-content"].innerHTML;
      // console.log("text1", text);
      text = text
        .replace(/&nbsp;/g, "")
        .replace(/\n+/g, "")
        .replace(/<br\s*\/*>/g, "")
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "")
        .replace(/\s+/g, "");
      // console.log("isEmpty text", text);
      return !text;
    },
    setContent(v) {
      if (v) {
        if (!v.startsWith("<p")) {
          v = `<p>${v}</p>`;
        }
      } else {
        v = "<p></p>";
      }
      v = v.replaceAll("<p></p>", "");
      //console.log({ v }, 2);
      this.$refs["editor-content"].innerHTML = v;
    },
    getContent() {
      return this.$refs["editor-content"].innerHTML;
    },
    onChange(e) {
      if (!this.typing) {
        let text = e.target.innerHTML;
        if (!text.startsWith("<p")) {
          text = `<p>${text}</p>`;
        }
        text = text.replaceAll("<p></p>", "");
        // console.log("onChange", text);
        this.$emit("input", text);
      }
    },
    onKeyUp() {
      this.setSelection();
    },
    onClick() {
      this.setSelection();
    },
    textareaRange(again = false) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const newLine = document.createElement("p");
      newLine.innerHTML = "<br>";
      range.insertNode(newLine);
      range.setStartAfter(newLine);
      range.setEndAfter(newLine);
      selection.removeAllRanges();
      selection.addRange(range);
      if (this.$refs["editor-content"].innerHTML === "<p><br></p>" && !again) {
        return this.textareaRange(true);
      }
    },
    setSelection() {
      const selection = window.getSelection();
      // 设置最后光标对象
      this.lastEditRange = selection.getRangeAt(0);
    },
    onCompositionstart() {
      this.typing = true;
      //console.log("开始打字");
    },
    onCompositionend() {
      this.typing = false;
      this.$emit("input", this.$refs["editor-content"].innerHTML);
      //console.log("打完收工", this.$refs["editor-content"].innerHTML);
    },
    onEnter(e) {
      this.$emit("input", this.$refs["editor-content"].innerHTML);
      this.$emit("enterSend", e);
    },
    async onPaste(e) {
      // 禁止默认粘贴行为
      e.preventDefault();
      // 获取粘贴板内容
      var clipboardData = e.clipboardData || window.clipboardData;
      var files = clipboardData.files;
      if (files.length) {
        for (let item of files) {
          if (item.type.includes("image")) {
            const base64 = await this.getBase64(item);
            const img = `<img src="${base64}">`;
            this.insertContent(img);
          }
        }
      } else {
        let text = clipboardData.getData("text/plain");
        let html = clipboardData.getData("text/html");
        const imgs = html.match(/<img[^>]*>/g) || [];
        text = text.replaceAll("\n", "<br>") + imgs.join("");
        text = text.replace(/style="[^"]+"/g, "");
        if (text) {
          this.insertContent(text);
        }
      }
    },
    focusLast() {
      this.$nextTick(() => {
        setTimeout(() => {
          const p = this.$refs["editor-content"],
            s = window.getSelection(),
            r = document.createRange();
          r.setStart(p, 1);
          r.setEnd(p, 1);
          s.removeAllRanges();
          s.addRange(r);
        }, 100);
      });
    },
    insertContent(text) {
      if (!text) return;
      //console.log("this.lastEditRange", this.lastEditRange);
      // 获取当前选区对象
      const selection = window.getSelection();
      // 判断是否有最后光标对象存在
      if (this.lastEditRange) {
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        selection.removeAllRanges();
        selection.addRange(this.lastEditRange);
      } else {
        this.focus();
      }
      if (document.execCommand instanceof Function) {
        document.execCommand("insertHtml", false, text);
      } else {
        if (selection.getRangeAt && selection.rangeCount) {
          var range = selection.getRangeAt(0);
          // 将选区范围设置为光标所在位置
          range.deleteContents();
          // 在光标位置插入粘贴内容
          var el = document.createElement("span");
          el.innerHTML = text;
          let frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          //收尾
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }
      this.setSelection();
    },
    getBase64(file) {
      return new Promise((resolve) => {
        ///FileReader类就是专门用来读文件的
        const reader = new FileReader();
        //开始读文件
        //readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串，
        reader.readAsDataURL(file);
        // 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
        reader.onload = () => resolve(reader.result);
        // 失败返回失败的信息
        reader.onerror = () => {
          //console.error("file转base64失败", error.toString());
          resolve(null);
        };
      });
    },
  },
};
</script>
