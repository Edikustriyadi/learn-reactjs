import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();

	return (
		<>
			<Head>
				<title>Home</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				{session ? (
					<button onClick={() => signOut()}>Sign out</button>
				) : (
					<button onClick={() => signIn()}>Sign in</button>
				)}
			</main>
		</>
	);
}