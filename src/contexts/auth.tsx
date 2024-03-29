import React, { createContext, useState, useCallback, useEffect } from "react";

import UserType from "@/@types/UserType";

import GetMyPosts from "@/services/post/GetMyPosts";
import UpdatePost from "@/services/post/UpdatePost";
import Login from "@/services/user/Login";
import Logout from "@/services/user/Logout";
import PhotoStorage from "@/services/user/PhotoStorage";
import Register from "@/services/user/Register";
import UpdateImagem from "@/services/user/UpdateImage";
import UpdateLikesPosts from "@/services/user/UpdateLikesPosts";
import UpdateName from "@/services/user/UpdateName";

import { toast } from "react-toastify";

interface AuthContextInterface {
  signed: boolean;
  user: UserType | null;
  signUp: ({ name, email, password }: RegisterProps) => void;
  signIn: ({ email, password }: LoginProps) => void;
  updateUser: ({ imageAvatar, name }: UpdateProps) => Promise<void>;
  newPostLike: (likesPosts: string[]) => void;
  logout: () => void;
}

interface UpdateProps {
  name: string;
  imageAvatar: File | null;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const isUser = localStorage.getItem("@auth.user");
    if (isUser) setUser(JSON.parse(isUser));
  }, [setUser]);

  const saveChangeUser = useCallback((newUser: UserType) => {
    setUser(newUser);
    storageUser(newUser);
    updatePosts(newUser);
  }, []);

  const updatePosts = async (newUser: UserType) => {
    const posts = await GetMyPosts().then((data) => {
      return data.list;
    });

    posts.forEach((item) => {
      if (item.authorId === newUser.uid) {
        item.authorName = newUser.name;
        item.photoUser = newUser.avatarUrl as string;
        UpdatePost(item);
      }
    });
  };

  const signUp = useCallback(
    ({ name, email, password }: RegisterProps) => {
      Register(email, password, name)
        .then((data) => {
          toast.success("Bem vindo a plataforma!");
          saveChangeUser(data as UserType);
        })
        .catch((err) => {
          toast.error("Conta já criada!");
          console.log(err);
        });
    },
    [saveChangeUser]
  );

  const signIn = useCallback(
    ({ email, password }: LoginProps) => {
      Login(email, password)
        .then((data) => {
          toast.success(`Bem vindo de volta, ${data?.name}!`);
          saveChangeUser(data as UserType);
        })
        .catch((err) => {
          toast.error("Email ou senha inconrretos!");
          console.log(err);
        });
    },
    [saveChangeUser]
  );

  const newPostLike = useCallback(
    async (likesPosts: string[]) => {
      const newUser = user as UserType;
      await UpdateLikesPosts(newUser.uid, likesPosts)
        .then(() => {
          newUser.likesPosts = likesPosts;
          saveChangeUser(newUser);
        })
        .catch((err) => console.log(err));
    },
    [saveChangeUser, user]
  );

  const updateUser = useCallback(
    async ({ imageAvatar, name }: UpdateProps) => {
      const changeUser = user as UserType;
      if (imageAvatar) {
        const ref = PhotoStorage(changeUser.uid as string, imageAvatar);
        changeUser.avatarUrl = await UpdateImagem(
          changeUser.uid as string,
          await ref.then((value) => {
            return value;
          })
        ).then((image) => image as string);
      }
      changeUser.name = await UpdateName(changeUser.uid as string, name).then(
        (name) => name as string
      );

      saveChangeUser(changeUser);
    },
    [saveChangeUser, user]
  );

  function storageUser(user: UserType) {
    localStorage.setItem(
      "@auth.user",
      JSON.stringify({
        uid: user.uid,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl ?? " ",
        likesPosts: user.likesPosts ?? [],
      })
    );
  }

  const logout = useCallback(() => {
    Logout();
    setUser(null);
    localStorage.removeItem("@auth.user");
    localStorage.removeItem("@theme");
    toast.info("Saindo da plataforma...");
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signUp,
        signIn,
        logout,
        updateUser,
        newPostLike,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
