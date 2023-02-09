import PublicationType from "@/@types/PublicationType";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import GetMyPosts from "@/services/post/GetMyPosts";
import React, { useRef, useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Carrosel() {
  const { checked } = useTheme();
  const carroselRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState<PublicationType[]>([]);

  useEffect(() => {
    async function loadingMyPosts() {
      const posts = await GetMyPosts().then((data) => {
        return data.list;
      });
      const myPosts = posts.filter((item) => item.authorId === user?.uid);
      setMyPosts(myPosts);
    }
    loadingMyPosts();
  }, [user?.uid]);

  const handleLeftClick = () => {
    if (carroselRef.current) {
      carroselRef.current.scrollLeft -= carroselRef.current.offsetWidth;
    }
  };

  const handleRightClick = () => {
    if (carroselRef.current) {
      carroselRef.current.scrollLeft += carroselRef.current.offsetWidth;
    }
  };

  return (
    <div className={styles.carrosel} ref={carroselRef}>
      {myPosts?.length === 0 ? (
        <h1>Publique alguma coisa...</h1>
      ) : (
        <>
          {myPosts.map((value) => (
            <div
              className={styles.rectangle}
              key={value.uid}
              style={{
                backgroundImage: `url(${value.bannerUrl})`,
                backgroundSize: "cover",
              }}
            >
              <span>{value.name}</span>
            </div>
          ))}
          <div className={styles.buttons}>
            <button onClick={handleLeftClick}>
              <MdKeyboardArrowLeft size={68} color="rgb(92, 92, 92)" />
            </button>
            <button onClick={handleRightClick}>
              <MdKeyboardArrowRight size={68} color="rgb(92, 92, 92)" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
