import styles from "@/styles/closet.module.css";
import { GetStaticPaths } from "next";
import { useState } from "react";

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

  const paths = data.map((imageData) => ({
    params: { id: imageData.image_id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  return { props: { image_id: params.id } };
};

export default function Generated({ user_id }: { user_id: string }) {
  let getData: boolean = true;
  const [data, setData] = useState<{
    isLoading: boolean;
    item: string | null;
  }>({
    isLoading: false,
    item: null,
  });

  return (
    <>
      {!data.isLoading && (
        <div className={styles.closetPageLandingSection}>
            <div className={styles.closetPageBanner}>Closet Coming Soon...</div>
        </div>
      )}
    </>
  );
}
