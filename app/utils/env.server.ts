// app/utils/env.server.ts

import { z } from 'zod'

const schema = z.object({
	NODE_ENV: z.enum(['production', 'development', 'test'] as const),
	DATABASE_PATH: z.string(),
	DATABASE_URL: z.string(),
	SESSION_SECRET: z.string(),
	INTERNAL_COMMAND_TOKEN: z.string(),
	HONEYPOT_SECRET: z.string(),
	CACHE_DATABASE_PATH: z.string(),
	// If you plan on using Sentry, uncomment this line
	// SENTRY_DSN: z.string(),
	// If you plan to use Resend, uncomment this line
	// RESEND_API_KEY: z.string(),
	// If you plan to use GitHub auth, remove the default:
	GITHUB_CLIENT_ID: z.string().default('MOCK_GITHUB_CLIENT_ID'),
	GITHUB_CLIENT_SECRET: z.string().default('MOCK_GITHUB_CLIENT_SECRET'),
	GITHUB_TOKEN: z.string().default('MOCK_GITHUB_TOKEN'),
	// If you plan to use Google auth, remove the default:
	GOOGLE_CLIENT_ID: z.string().default('MOCK_GOOGLE_CLIENT_ID'),
	GOOGLE_CLIENT_SECRET: z.string().default('MOCK_GOOGLE_CLIENT_SECRET'),
	ALLOW_INDEXING: z.enum(['true', 'false']).optional(),
	RELEASE_PACKAGE: z.string(),
})

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof schema> { }
	}
}

export function init() {
	const parsed = schema.safeParse(process.env)

	if (parsed.success === false) {
		console.error(
			'❌ Invalid environment variables:',
			parsed.error.flatten().fieldErrors,
		)

		throw new Error('Invalid environment variables')
	}
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
	return {
		MODE: process.env.NODE_ENV,
		SENTRY_DSN: process.env.SENTRY_DSN,
		ALLOW_INDEXING: process.env.ALLOW_INDEXING,
	}
}

type ENV = ReturnType<typeof getEnv>

declare global {
	var ENV: ENV
	interface Window {
		ENV: ENV
	}
}


const requiredInProduction: z.RefinementEffect<
  string | undefined
>["refinement"] = (value, ctx) => {
  if (process.env.NODE_ENV === "production" && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Missing required environment variable " + ctx.path.join("."),
    });
  }
};

const requiredInDevelopment: z.RefinementEffect<
  string | undefined
>["refinement"] = (value, ctx) => {
  if (process.env.NODE_ENV === "development" && !value) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Missing required environment variable " + ctx.path.join("."),
    });
  }
};

const envSchema = z.object({
	// A token to increase the rate limiting from 60/hr to 1000/hr
	GITHUB_TOKEN_DOCS: z.string().optional().superRefine(requiredInProduction),
  
	// GitHub repo to pull docs from
	SOURCE_REPO: z.string(),
  
	// Package from which to base docs version
	RELEASE_PACKAGE: z.string(),
	
  
	// For development, reading the docs from a local repo
	LOCAL_REPO_RELATIVE_PATH: z
	  .string()
	  .optional()
	  .superRefine(requiredInDevelopment),
  
	NO_CACHE: z.coerce.boolean().default(false),
  });
  

export const env = envSchema.parse(process.env);