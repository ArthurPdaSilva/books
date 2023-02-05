import UserType from "@/@types/UserType";
import Sidebar from "@/components/Sidebar";
import Switch from "@/components/Switch";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { MdAccountCircle, MdOutlineFileUpload } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { checked } = useTheme();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);
  const router = useRouter();

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value[0]) {
      if (!e.target.files) return;
      const image = e.target.files[0];
      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert("Envie uma imagem válida!");
        return null;
      }
    }
  }, []);

  const submitType = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await updateUser({ imageAvatar, name: name as string }).then(() => {
        alert("Alterações feitas com sucesso!");
        router.push("/dashboard");
      });
    },
    [imageAvatar, name, router, updateUser]
  );

  return (
    <>
      <Head>
        <title>Books - Editar perfil</title>
      </Head>
      <div className={checked ? styles.containerDark : styles.containerLight}>
        <Sidebar />
        <div className={styles.content}>
          <h1>Perfil</h1>

          <form className={styles.form} onSubmit={submitType}>
            <label className={styles.labelAvatar}>
              <span>
                <MdOutlineFileUpload color="#fff" size={30} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              {avatarUrl !== " " ? (
                <Image
                  src={avatarUrl as string}
                  height={192}
                  width={200}
                  alt="Imagem do usuário"
                />
              ) : (
                <MdAccountCircle size={220} />
              )}
            </label>

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />

            <label>
              Dark Mode:
              <Switch />
            </label>

            <button type="submit" className={styles.buttonProfile}>
              Salvar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
