import Form from "@/components/Form";
import Head from "next/head";
import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Books - Cadastrando-se</title>
      </Head>
      <Form typeForm="Cadastro" buttonText="Cadastrar">
        <Link href="/">
          Já possui uma conta? <span>Entrar</span>
        </Link>
      </Form>
    </>
  );
}
