import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
			clientSecret: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}`,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({
			session,
			token,
			user,
		}: {
			session: any;
			token: any;
			user: any;
		}) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token.accessToken;
			return session;
		},
	},
});
// export const authOptions = {
// 	// Configure one or more authentication providers
// 	providers: [
// 		GoogleProvider({
// 			clientId: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
// 			clientSecret: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}`,
// 		}),
// 		// ...add more providers here
// 	],
// 	callbacks: {
// 		async jwt({ token, account }:{token:any, account:any}) {
// 			// Persist the OAuth access_token to the token right after signin
// 			if (account) {
// 				token.accessToken = account.access_token;
// 			}
// 			return token;
// 		},
// 		async session({ session, token, user }:{session:any, token:any, user:any}) {
// 			// Send properties to the client, like an access_token from a provider.
// 			session.accessToken = token.accessToken;
// 			return session;
// 		},
// 	},
// };
// export default NextAuth(authOptions);
