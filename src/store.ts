import { createClient } from "@supabase/supabase-js";
import { proxy } from "valtio";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export enum ModelType {
  WOMBO = "WOMBO",
  REPLICATE = "REPLICATE",
}

export enum ThreeModelType {
  SHIRT = "SHIRT",
  TSHIRT = "TSHIRT",
  PANTS = "PANTS"
}

const store = proxy({
  imageURI: "/assets/default.jpg",
  isGenerating: false,
  loadingSpeed: 10,
  isUserLoggedIn: false,
  isModalOpen: false,
  isSuggestionsModalOpen: false,
  isAutoGPTModalOpen: false,
  isFileUploadModalOpen: false,
  isLiked: false,
  isDisliked: false,
  checkoutURL: 'https://silic.vercel.app/assets/default.jpg',
  threeModel: '/assets/shirtnew.glb',
  imageId: '',
  modelType: 'REPLICATE',
});

export const supabaseStore = createClient(supabaseUrl, supabaseAnonKey);

export default store;
