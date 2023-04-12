import { GetServerSideProps } from "next";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import styles from "@/styles/gallery.module.css";
import { supabaseStore } from "@/store";

export const getStaticProps: GetServerSideProps = async () => {
  const { data, error } = await supabaseStore.from("inventory").select("*");

  if (error || !data) {
    console.error("Error fetching data:", error);
    return { props: { images: [] } };
  }

  return { props: { images: data } };
};


export default function Home({ images }: { images: any[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.galleryPageHeading}>Image Gallery</div>
      <div className={styles.galleryPageSubHeading}>Revolutionize Your Fabric Designs with Generative AI: Unlock Infinite Creativity and Unique Patterns for Stunning Prints</div>
      <div className={styles.grid}>
        {images.map((image) => (
          <div key={image.id} className={styles.card}>
            <Image
              src={image.image}
              width={50}
              height={50}
              alt={image.id}
            />
            {/* <h3>{image.title}</h3> */}
          </div>
        ))}
      </div>
    </div>
  );
}