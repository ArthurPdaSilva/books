import UserType from "@/@types/UserType";
import Login from "@/services/user/Login";
import Logout from "@/services/user/Logout";
import PhotoStorage from "@/services/user/PhotoStorage";
import Register from "@/services/user/Register";
import UpdateImagem from "@/services/user/UpdateImage";
import UpdateName from "@/services/user/UpdateName";
import React, { createContext, useState, useCallback, useEffect } from "react";

interface AuthContextInterface {
  signed: boolean;
  user: UserType | null;
  signUp: ({ name, email, password }: RegisterProps) => void;
  signIn: ({ email, password }: LoginProps) => void;
  updateUser: ({ imageAvatar, name }: UpdateProps) => Promise<void>;
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
  }, []);

  const signUp = useCallback(
    ({ name, email, password }: RegisterProps) => {
      Register(email, password, name)
        .then((data) => {
          saveChangeUser(data as UserType);
          alert("Bem vindo a plataforma!");
        })
        .catch(() => {
          alert("Conta já criada!");
        });
    },
    [saveChangeUser]
  );

  const signIn = useCallback(
    ({ email, password }: LoginProps) => {
      Login(email, password)
        .then((data) => {
          saveChangeUser(data as UserType);
          alert(`Bem vindo de volta, ${data?.name}!`);
        })
        .catch(() => {
          alert("Email ou senha inconrretos!");
        });
    },
    [saveChangeUser]
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
      })
    );
  }

  const logout = useCallback(() => {
    Logout();
    setUser(null);
    localStorage.removeItem("@auth.user");
    localStorage.removeItem("@theme");
    alert("Saindo da plataforma...");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
