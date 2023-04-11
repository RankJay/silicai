import { proxy } from "valtio";

const store = proxy({
  imageId: "try",
  imageURI: "http://localhost:3000/assets/try.png",
});

export default store;
