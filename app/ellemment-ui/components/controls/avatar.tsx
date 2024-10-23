import { Link } from '@remix-run/react'
import { clsx } from 'clsx'
import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import * as React from 'react'
import { Avatar as RadixAvatar, AvatarImage, AvatarFallback } from '#app/components/ui/avatar'
import { useElementState } from '#app/ellemment-ui/hooks/use-element-state'
import { useOptionalUser } from '#app/utils/use-root-data'

const durations = {
  initial: 40,
  hover: 3,
  focus: 3,
  active: 0.25,
}

interface AvatarProps {
  imageUrl: string
  imageAlt: string
  className?: string
}

export function Avatar({ imageUrl, imageAlt, className }: AvatarProps) {
  const user = useOptionalUser()
  const controls = useAnimation()
  const [ref, state] = useElementState()
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    void controls.start((_, { rotate = 0 }) => {
      const target =
        typeof rotate === 'number'
          ? state === 'initial'
            ? rotate - 360
            : rotate + 360
          : 360
      return shouldReduceMotion
        ? {}
        : {
            rotate: [rotate, target],
            transition: {
              duration: durations[state],
              repeat: Infinity,
              ease: 'linear',
            },
          }
    })
  }, [state, controls, shouldReduceMotion])

  return (
    <Link
      prefetch="intent"
      to={user ? '/me' : '/login'}
      aria-label={user ? 'My Account' : 'Login'}
      className={clsx(
        'inline-flex h-8 w-8 items-center justify-center rounded-full focus:outline-none',
        className
      )}
      ref={ref}
    >
      <motion.div
        className="absolute"
        animate={controls}
      >
      </motion.div>
      <RadixAvatar className="h-6 w-6 overflow-hidden">
        <AvatarImage
          src={imageUrl}
          alt={imageAlt}
          className="h-full w-full object-cover select-none"
          crossOrigin="anonymous"
        />
        <AvatarFallback delayMs={600}>
          {imageAlt
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)}
        </AvatarFallback>
      </RadixAvatar>
    </Link>
  )
}