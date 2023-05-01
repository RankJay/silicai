import { supabaseStore } from "@/store";
import styles from "@/styles/closet.module.css";
import { Loader } from "@react-three/drei";
import axios from "axios";
import { GetStaticPaths } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface UserObjects {
  user_id: string;
  created_at: Date;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  useraddress: string;
  clerk_id: string;
}

interface InventoryObjects {
  image_id: string;
  created_at: Date;
  prompt: string;
  clerk_id: string;
  replicate_url: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/user/`
  );
  const data: UserObjects[] = await res.json();

  const paths = data.map((imageData) => ({
    params: { id: imageData.clerk_id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: { params: any }) => {
  const res = await axios.post(
    `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/user/get`,
    {
      clerk_id: params.id,
    }
  );
  const userResponse: UserObjects[] = await res.data;
  return { props: { user: userResponse[0] } };
};

export default function Generated({ user }: { user: UserObjects }) {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<InventoryObjects[]>([]);
  const [imageData, setImageData] = useState<{ [key: string]: string }>({});
  const clerkObj = useUser();

  useEffect(() => {
    const fetchImageData = async (imageId: string) => {
      const response = await supabaseStore.storage
        .from("silicai-bucket")
        .download(`production/${imageId}.png`);
      const blob = response.data as Blob;
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      setImageData((prevState) => ({ ...prevState, [imageId]: dataUrl }));
    };

    const fetchAllImageData = async () => {
      const res = await axios.post(
        `https://silicai-server-0sdj.zeet-silicai.zeet.app/api/inventory/get`,
        {
          clerk_id: user.clerk_id,
        }
      );
      const imagesResponse: InventoryObjects[] = await res.data;
      setImages(imagesResponse);
      console.log(images);
      for (const image of images) {
        fetchImageData(image.image_id);
      }
      setIsLoading(false);
    };

    fetchAllImageData();
  }, [images, user.clerk_id]);

  return (
    <>
      {!isLoading && (
        <div className={styles.closetPageLandingSection}>
          <div className={styles.closetPageCard}>
            <div className={styles.closetPagePFP}>
              <Image
                src={clerkObj.user?.profileImageUrl as string}
                alt={""}
                width={50}
                height={50}
                style={{
                  width: "80%",
                  height: "80%",
                  borderRadius: "1rem",
                }}
              />
            </div>
            <div className={styles.closetPageDetails}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <div className={styles.closetPageDetailsKey}>Username:</div>
                <div
                  className={styles.closetPageDetailsValue}
                  style={{ paddingLeft: "1rem" }}
                >
                  {clerkObj.user?.username}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div className={styles.closetPageDetailsKey}></div>
                <div
                  className={styles.closetPageDetailsValue}
                  style={{ textAlign: "start" }}
                >
                  Designs may take a<br />
                  few moments to load
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.grid}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {images?.map((image) => (
                <div key={image.image_id} className={styles.card}>
                  <Link href={`/design/${image.image_id}`}>
                    {imageData[image.image_id] ? (
                      <Image
                        src={imageData[image.image_id]}
                        width={50}
                        height={50}
                        alt={""}
                      />
                    ) : (
                      <div
                        className={styles.card}
                        style={{
                          backgroundColor: "#aaa",
                          width: "285px",
                          padding: "0.5rem",
                          height: "300px",
                        }}
                      ></div>
                    )}
                  </Link>
                  {/* <h3>{image.prompt}</h3> */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
