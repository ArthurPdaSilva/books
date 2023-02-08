import PublicationType from "@/@types/PublicationType";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import AddPost from "@/services/post/AddPost";
import UpdateFiles from "@/services/post/UpdateFiles";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { FormEvent, useState, useCallback } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import styles from "./styles.module.scss";

export default function Publications() {
  const { user } = useAuth();
  const { checked } = useTheme();
  const [name, setName] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const errors = [
        "Adicione um nome para a obra que tenha, pelo menos, 5 caracteres!",
        "Selecione o tipo de material",
        "Adicione um banner/arquivo!",
        "Falha",
      ];
      const validations = [
        name.length <= 0,
        materialType === "none" || !materialType,
        !file || !banner,
      ];

      if (validations[0]) {
        toast.warning(errors[0]);
      } else if (validations[1]) {
        toast.warning(errors[1]);
      } else if (validations[2]) {
        toast.warning(errors[2]);
      } else {
        setLoading(true);
        const newPost: PublicationType = {
          authorId: user?.uid as string,
          uid: v4(),
          authorName: user?.name as string,
          created: new Date(),
          likes: 0,
          name,
          type: materialType,
          bannerUrl: " ",
          fileUrl: " ",
        };
        AddPost(newPost)
          .then(async () => {
            await UpdateFiles(newPost.uid, banner as File, file as File);
            toast.success("Criada com sucesso");
            setLoading(false);
            Router.push("/dashboard");
            return;
          })
          .catch((errs) => {
            toast.error(errors[3]);
            setLoading(false);
            console.log(errs);
          });
      }
    },
    [banner, file, materialType, name, user?.name, user?.uid]
  );

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value[0]) {
      if (!e.target.files) return;
      const files = e.target.files[0];
      setFile(files);
    }
  }, []);

  const handleBanner = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value[0]) {
      if (!e.target.files) return;
      const image = e.target.files[0];
      if (image.size < 68857) {
        toast.warning("Imagem muito pequena, selecione outra");
        return;
      }
      setBanner(image);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Books - Criando publicação</title>
      </Head>
      <div className={checked ? styles.containerDark : styles.containerLight}>
        <Sidebar />
        <div className={styles.content}>
          <form className={styles.forms} onSubmit={handleAdd}>
            <h2>Cadastrar Material</h2>
            <input
              type="text"
              placeholder="Nome do Material"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={8}
            />
            <select
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              <option value="none">Tipo do Material</option>
              <option value="Livro">Livro</option>
              <option value="Poema">Poema</option>
              <option value="Conselho">Conselho</option>
              <option value="Reflexão">Reflexão</option>
            </select>
            <label className={styles.labelFile}>
              Banner:
              <MdOutlineFileUpload color="#fff" size={30} />
              <input type="file" accept="image/*" onChange={handleBanner} />
            </label>
            <label className={styles.labelFile}>
              Arquivo:
              <MdOutlineFileUpload color="#fff" size={30} />
              <input
                type="file"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
text/plain, application/pdf,"
                onChange={handleFile}
              />
            </label>
            <div className={styles.buttons}>
              <Link href="/dashboard">Voltar</Link>
              <button type="submit">
                {loading ? <AiOutlineReload size={30} /> : "Cadastrar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
