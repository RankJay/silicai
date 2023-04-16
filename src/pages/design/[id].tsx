import store from "@/store";
import ShirtModel from "../components/ShirtModel";
import styles from "@/styles/design.module.css";
import { GetStaticPaths } from "next";

interface InventoryObjects {
  image_id: string;
  created_at: string;
  user_id: string;
}

interface Designs {
  [key: string]: Blob,
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.BE_URL}/api/inventory/`
  );
  const data: InventoryObjects[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((imageData) => ({
    params: { id: imageData.image_id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({params}: {params: any}) => {
  const render = await fetch(`${process.env.BE_URL}/api/user/inventory/get`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
      body: JSON.stringify({image_id: params.id })
    })
  
  const image = await render.json();

  return { props: {image: '/assets/try.png'} }
}

export default function Generated({ image }: {image: string}) {
  console.log(image);
  store.imageURI = image;
  return (
    <>
        <div className={styles.designPageLandingSection}>
          <ShirtModel />
        </div>
    </>
  );
}
