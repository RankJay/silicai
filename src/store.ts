import { proxy } from "valtio";

const store = proxy({
  imageId: "try",
  imageURI: "https://silic.vercel.app/assets/try.png",
});

export default store;
