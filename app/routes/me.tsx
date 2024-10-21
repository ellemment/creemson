// app/routes/me.tsx

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId, logout } from '#app/utils/auth.server.js'
import { prisma } from '#app/utils/db.server.js'

export async function loader({ request }: LoaderFunctionArgs) {
	const userId = await requireUserId(request)
	const user = await prisma.user.findUnique({ where: { id: userId } })
	if (!user) {
		const requestUrl = new URL(request.url)
		const loginParams = new URLSearchParams([
			['redirectTo', `${requestUrl.pathname}${requestUrl.search}`],
		])
		const redirectTo = `/login?${loginParams}`
		await logout({ request, redirectTo })
		return redirect(redirectTo)
	}
	return redirect(`/users/${user.username}`)
}
