// app/routes/_marketing+/index.tsx
import { type MetaFunction } from '@remix-run/node'
import Discover from '#app/components/playground/discover.js'
import Hero from '#app/components/playground/hero'
import { PlayBox } from '#app/components/playground/play-box'

export const meta: MetaFunction = () => [{ title: 'Creemson' }]

export default function Index() {
  return (
    <main className="font-poppins grid h-full place-items-center">
      <Hero />
      <Discover />
      <PlayBox />
    </main>
  )
}