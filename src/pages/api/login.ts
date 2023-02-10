// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import nextConnect from "next-connect";

const GoogleStrategy = passportGoogle.Strategy;

// passport.serializeUser stores user object passed in the cb method above in req.session.passport
passport.serializeUser((user, cb) => {
	process.nextTick(function () {
		return cb(null, user);
	});
});

// passport.deserializeUser stores the user object in req.user
passport.deserializeUser(function (
	user: any,
	cb: (arg0: null, arg1: any) => any
) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`,
			clientSecret: `${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET}`,
			callbackURL: `${process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URI}`,
			scope: ["profile"],
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(accessToken);
		}
	)
);
const handler = nextConnect()
	.use(passport.initialize())
	.get(
		passport.authenticate("google", {
			successRedirect: "/dashboard",
			failureRedirect: "/",
		}),
		(req: NextApiRequest, res: NextApiResponse) => {
			res.redirect("/dashboard");
		}
	);

export default handler;
