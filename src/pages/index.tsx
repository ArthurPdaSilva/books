import Form from "@/components/Form";
import Head from "next/head";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>Books - Entrando na plataforma</title>
      </Head>
      <Form typeForm="Login" buttonText="Acessar">
        <Link href="/signup">
          Não tem uma conta? <span>Criar uma conta</span>
        </Link>
      </Form>
    </>
  );
}
