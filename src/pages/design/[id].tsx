import ShirtModel from "@/pages/components/model/ShirtModel";
import styles from "@/styles/design.module.css";
import { GetStaticPaths } from "next";
import { useEffect, useState } from "react";

interface InventoryObjects {
  image_id: string;
  created_at: string;
  user_id: string;
}

interface Designs {
  [key: string]: Blob;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://silicai-server-0sdj.zeet-silicai.zeet.app/api/inventory/`);
  const data: InventoryObjects[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((imageData) => ({
    params: { id: imageData.image_id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  // const render = await fetch(`https://silicai-server-52dq.zeet-silicai.zeet.app/api/user/inventory/get`, {
  //     method: "POST",
  //     headers: {
  //       "Access-Control-Allow-Methods": "HEAD, GET, POST, PUT, PATCH, DELETE",
  //       "Access-Control-Allow-Headers": "Content-Type,Authorization",
  //       "Content-type": "application/json; charset=UTF-8",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     mode: "cors",
  //     body: JSON.stringify({image_id: params.id })
  //   })

  // const image = await render.json();

  // return { props: {image: `data:image/png;base64,${image.image}`} }

  return { props: { image_id: params.id } };
};

export default function Generated({ image_id }: { image_id: string }) {
  let getData: boolean = true;
  const [data, setData] = useState<{
    isLoading: boolean;
    item: string | null;
  }>({
    isLoading: true,
    item: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (getData) {
        const render = await fetch(
          `http://127.0.0.1:3000/api/user/inventory/get`,
          {
            method: "POST",
            headers: {
              "Access-Control-Allow-Methods":
                "HEAD, GET, POST, PUT, PATCH, DELETE",
              "Access-Control-Allow-Headers": "Content-Type,Authorization",
              "Content-type": "application/json; charset=UTF-8",
              "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
            body: JSON.stringify({ image_id }),
          }
        );

        const image = await render.arrayBuffer();
        const buffer = new Uint8Array(image).buffer;
        const blob = new Blob([image]);
        const ff  = new Buffer(buffer);
        console.log(ff.toString('base64'));
      }
    };

    fetchData();
  });
  return (
    <>
      {!data.isLoading && !data.item && (
        <div className={styles.designPageLandingSection}>
          <ShirtModel />
        </div>
      )}
    </>
  );
}
