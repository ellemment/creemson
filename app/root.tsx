// app/root.tsx

import {
	json,
	type LoaderFunctionArgs,
	type HeadersFunction,
	type LinksFunction,
	type MetaFunction,
} from '@remix-run/node'
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
} from '@remix-run/react'
import { withSentry } from '@sentry/remix'
import clsx from 'clsx'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { GlobalHeader } from '#app/ellemment-ui/components/navigation/headers/header-global'
import { type DonHandle } from '#app/types.ts'
import { GeneralErrorBoundary } from './components/core/error-boundary.tsx'
import { EpicProgress } from './components/core/progress-bar.tsx'
import { useToast } from './components/core/toaster.tsx'
import { href as iconsHref } from './components/ui/icon.tsx'
import { EpicToaster } from './components/ui/sonner.tsx'
import { useTheme } from './routes/resources+/theme-switch.tsx'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'
import { getUserId, logout } from './utils/auth.server.ts'
import { ClientHintCheck, getHints } from './utils/client-hints.tsx'
import { prisma } from './utils/db.server.ts'
import { getEnv } from './utils/env.server.ts'
import { honeypot } from './utils/honeypot.server.ts'
import { combineHeaders, getDomainUrl } from './utils/misc.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import { getTheme } from './utils/theme.server.ts'
import { makeTimings, time } from './utils/timing.server.ts'
import { getToast } from './utils/toast.server.ts'


type Theme = 'light' | 'dark'

export const handle: DonHandle & { id: string } = {
	id: 'root',
}


export const links: LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		{ rel: 'mask-icon', href: '/favicons/mask-icon.svg' },
		{
			rel: 'alternate icon',
			type: 'image/png',
			href: '/favicons/favicon-32x32.png',
		},
		{ rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png' },
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		{ rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
	].filter(Boolean)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const requestInfo = data?.requestInfo
	return [
		{ title: data ? 'Creemson' : 'Error | Creemson' },
		{ name: 'description', content: `Your own captain's log` },
		{
			'theme-color':
				requestInfo?.userPrefs.theme === 'dark' ? '#1F2028' : '#FFF',
		},
	]
}

export async function loader({ request }: LoaderFunctionArgs) {
	const timings = makeTimings('root loader')
	const userId = await time(() => getUserId(request), {
		timings,
		type: 'getUserId',
		desc: 'getUserId in root',
	})

	const user = userId
		? await time(
			() =>
				prisma.user.findUniqueOrThrow({
					select: {
						id: true,
						name: true,
						username: true,
						image: { select: { id: true } },
						roles: {
							select: {
								name: true,
								permissions: {
									select: { entity: true, action: true, access: true },
								},
							},
						},
					},
					where: { id: userId },
				}),
			{ timings, type: 'find user', desc: 'find user in root' },
		)
		: null
	if (userId && !user) {
		console.info('something weird happened')
		// something weird happened... The user is authenticated but we can't find
		// them in the database. Maybe they were deleted? Let's log them out.
		await logout({ request, redirectTo: '/' })
	}
	const { toast, headers: toastHeaders } = await getToast(request)
	const honeyProps = honeypot.getInputProps()


	return json(
		{
			user,
			requestInfo: {
				hints: getHints(request),
				origin: getDomainUrl(request),
				path: new URL(request.url).pathname,
				userPrefs: {
					theme: getTheme(request),
				},
			},
			ENV: getEnv(),
			toast,
			honeyProps,
			userPrefs: {
				theme: getTheme(request),
			},
		},
		{
			headers: combineHeaders(
				{ 'Server-Timing': timings.toString() },
				toastHeaders,
			),
		},
	)
}

export type RootLoaderType = typeof loader

export const headers: HeadersFunction = ({ loaderHeaders }) => {
	const headers = {
		'Server-Timing': loaderHeaders.get('Server-Timing') ?? '',
	}
	return headers
}


function Document({
	children,
	nonce,
	theme = 'light',
	env = {},
	allowIndexing = true,
}: {
	children: React.ReactNode
	nonce: string
	theme?: Theme
	env?: Record<string, string>
	allowIndexing?: boolean
}) {
	return (
		<html lang="en" className={clsx(theme, 'h-full overflow-x-hidden')}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="bg-neutral-100 dark:bg-background text-primary transition duration-500">
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

function App() {
	const data = useLoaderData<typeof loader>();
	const nonce = useNonce();
	const theme = useTheme();
	const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false';
	useToast(data.toast);
	const location = useLocation();

	const showHeader = !location.pathname.startsWith('/login');

	return (
		<Document
			nonce={nonce}
			theme={theme}
			allowIndexing={allowIndexing}
			env={data.ENV}
		>
			<div className="flex h-screen flex-col justify-between">
				{showHeader && (
					<GlobalHeader />
				)}

				<div className="flex-1">
					<Outlet />
				</div>

				<footer className="">
					{/* Footer content if needed */}
				</footer>
			</div>
			<EpicToaster closeButton position="top-center" theme={theme} />
			<EpicProgress />
		</Document>
	);
}



function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<HoneypotProvider {...data.honeyProps}>
			<App />
		</HoneypotProvider>
	)
}

export default withSentry(AppWithProviders)


export function ErrorBoundary() {
	// the nonce doesn't rely on the loader so we can access that
	const nonce = useNonce()

	// NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
	// likely failed to run so we have to do the best we can.
	// We could probably do better than this (it's possible the loader did run).
	// This would require a change in Remix.

	// Just make sure your root route never errors out and you'll always be able
	// to give the user a better UX.

	return (
		<Document nonce={nonce}>
			<GeneralErrorBoundary />
		</Document>
	)
}
