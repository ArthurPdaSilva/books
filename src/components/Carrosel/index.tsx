import React, { useRef, useState, useEffect } from "react";
import styles from "./styles.module.scss";

import PublicationType from "@/@types/PublicationType";

import useAuth from "@/hooks/useAuth";

import GetMyPosts from "@/services/post/GetMyPosts";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Carrosel() {
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
            <a
              href={value.fileUrl}
              style={{
                backgroundImage: `url(${value.bannerUrl})`,
                backgroundSize: "cover",
              }}
              className={styles.rectangle}
              target="_blank"
              download
              rel="noreferrer"
              key={value.uid}
            >
              <span>{value.name}</span>
            </a>
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
