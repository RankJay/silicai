import store, { supabaseStore } from "@/store";
import ShirtModel from "../components/ShirtModel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/design.module.css";

export default function Generated() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<{
    isLoading: boolean;
    items:
      | {
          [x: string]: any;
        }[];
  }>({
    isLoading: true,
    items: [],
  });

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabaseStore
        .from("inventory")
        .select("*")
        .eq("id", id);

      if (error || !data) {
        console.error("Error fetching data:", error);
      }

      if (data !== null) {
        setData({
          isLoading: false,
          items: data,
        });
      }
    }

    if (id !== undefined && typeof id === "string") {
      fetchData();
    }
  }, [id]);

  return (
    <>
      {!data.isLoading && !(data.items instanceof Promise) && (
        <div className={styles.designPageLandingSection}>
          {(store.imageURI = data.items[0].image)}
          <ShirtModel />
        </div>
      )}
    </>
  );
}
