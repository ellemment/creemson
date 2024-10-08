import { Callout, Link, Text } from "@radix-ui/themes";
import { Link as RemixLink } from "@remix-run/react";
import React from "react";

interface OldVersionNoteProps {
  name: string;
  href: string;
}

export function OldVersionNote({ name, href }: OldVersionNoteProps) {
  return (
    <Callout.Root color="yellow" mt={{ initial: "-3", md: "-8" }} mb="6">
      <Callout.Text>
        A newer version of <Text weight="bold">{name}</Text> is available.{" "}
        <Link asChild>
          <RemixLink to={href}>Learn more</RemixLink>
        </Link>
      </Callout.Text>
    </Callout.Root>
  );
}