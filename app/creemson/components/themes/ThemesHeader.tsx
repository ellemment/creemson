import { Link as RadixLink } from "@radix-ui/themes";
import { Link as RemixLink, useLocation } from "@remix-run/react";
import React from "react";
import { Header, type HeaderProps } from '#app/creemson/components/common/layout/Header';

export const ThemesHeader = (props: HeaderProps) => {
  const location = useLocation();

  return (
    <Header gitHubLink="https://github.com/radix-ui/themes" {...props}>
      <RadixLink
        size="2"
        color="gray"
        asChild
        highContrast={location.pathname.includes("/themes/docs")}
      >
        <RemixLink to="/themes/docs/overview/getting-started">
          Documentation
        </RemixLink>
      </RadixLink>
      <RadixLink
        size="2"
        color="gray"
        asChild
        highContrast={location.pathname.includes("/themes/playground")}
      >
        <RemixLink to="/themes/playground">
          Playground
        </RemixLink>
      </RadixLink>
    </Header>
  );
};