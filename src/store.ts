import { proxy } from "valtio";

const store = proxy({
  imageURI: "/assets/try.png",
  isGenerating: false,
  loadingSpeed: 10,
});

export default store;
