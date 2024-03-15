import { createApp, ref } from "vue";
import Popconfirm from "../../components/Popconfirm.vue";
import useState from "../../composables/useState.js";

export default function tooltipPlugin(app, options) {
  const initialState = {
    content: "待设置",
    placement: "top",
  };

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [placement, setPlacement] = useState(initialState.placement);
  const [content, setContent] = useState(initialState.content);
  const [showed, setShowed] = useState(false);
  const selfRef = ref();
  const targetRef = ref();

  const popconfirmApp = createApp(Popconfirm);

  popconfirmApp.provide("popconfirm-x", {
    x,
    setX,
  });
  popconfirmApp.provide("popconfirm-y", {
    y,
    setY,
  });
  popconfirmApp.provide("popconfirm-targetwidth", {
    targetWidth,
    setTargetWidth,
  });
  popconfirmApp.provide("popconfirm-targetheight", {
    targetHeight,
    setTargetHeight,
  });
  popconfirmApp.provide("popconfirm-placement", {
    placement,
    setPlacement,
  });
  popconfirmApp.provide("popconfirm-content", {
    content,
    setContent,
  });
  popconfirmApp.provide("popconfirm-showed", {
    showed,
    setShowed,
  });

  const popconfirm = {
    config({
      content = initialState.content,
      placement = initialState.placement,
    } = {}) {
      setContent(content);
      setPlacement(placement);
      return this;
    },
    popup(e) {
      const getOffset = (element, type) => {
        let offset = 0;
        if (element.offsetParent?.tagName.toLowerCase() !== "body") {
          offset += getOffset(element.offsetParent, type); // 递归调用
        }
        if (type === "top") {
          offset += element.offsetTop;
        } else if (type === "left") {
          offset += element.offsetLeft;
        }
        return offset;
      };

      setX(getOffset(e.target, "left"));
      setY(getOffset(e.target, "top"));

      setTargetWidth(e.target.offsetWidth);
      setTargetHeight(e.target.offsetHeight);

      this.result.value = "pending";
      targetRef.value = e.target;

      setShowed(true);
    },
    close() {
      setShowed(false);
    },
    result: ref(),
  };

  popconfirmApp.provide("popconfirm", popconfirm);
  app.provide("popconfirm", popconfirm);
  popconfirmApp.provide("popconfirm-self", selfRef);

  const handleClick = (e) => {
    if (!(selfRef.value.contains(e.target) || targetRef.value === e.target)) {
      if (showed.value) {
        setShowed(false);
      }
    }
  };
  /* 点击其他地方，取消显示 */
  document.body.addEventListener("click", handleClick);

  const div = document.createElement("div");
  document.body.appendChild(div);
  popconfirmApp.mount(div);
}
