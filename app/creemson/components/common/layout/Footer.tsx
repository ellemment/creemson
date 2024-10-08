import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import {
  Box,
  Grid,
  Text,
  Flex,
  Link as RadixLink,
  Heading,
  AccessibleIcon,
} from "@radix-ui/themes";
import { Link, useLocation } from "@remix-run/react";
import React from "react";
import { RadixLogo } from '#app/creemson/components/common/misc/RadixLogo.tsx';
import { BoxLink } from '#app/creemson/components/common/ui/BoxLink';
import styles from '#app/creemson/styles/modules/Footer.module.css';

export const Footer = () => {
  const location = useLocation();
  const isColors = location.pathname.includes("/colors");

  return (
    <Grid asChild pb="9" gapX="7" gapY="3" className={styles.Footer}>
      <footer>
        <Flex
          align="start"
          direction="column"
          className={styles.RadixLogo}
          mb="5"
        >
          <Link to="/" prefetch="intent">
            <BoxLink>
              <AccessibleIcon label="Radix Homepage">
                <RadixLogo />
              </AccessibleIcon>
            </BoxLink>
          </Link>
          <Box pr="8" mt="5">
            <Heading
              as="h6"
              size="2"
              style={{
                lineHeight: "20px",
                color: "var(--gray-10)",
                fontWeight: "inherit",
              }}
            >
              A project by{" "}
              <RadixLink color="gray" href="https://workos.com">
                WorkOS
              </RadixLink>
              .
            </Heading>
          </Box>
        </Flex>
        <Box>
          <Heading as="h6" size="3">
            Products
          </Heading>
          <ul>
            <li>
              <Text as="p" size="2" mt="3">
                <Link to="/" className="text-gray-500">Themes</Link>
              </Text>
            </li>
            <li>
              <Text as="p" size="2" mt="3">
                <Link to="/primitives" className="text-gray-500">Primitives</Link>
              </Text>
            </li>
            <li>
              <Text as="p" size="2" mt="3">
                <Link to="/colors" className="text-gray-500">Colors</Link>
              </Text>
            </li>
            <li>
              <Text as="p" size="2" mt="3">
                <Link to="/icons" className="text-gray-500">Icons</Link>
              </Text>
            </li>
          </ul>
        </Box>
        {!isColors && (
          <Box>
            <Heading as="h6" size="3">
              Docs
            </Heading>
            <ul>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/primitives/docs/overview/introduction" className="text-gray-500">
                    Introduction
                  </Link>
                </Text>
              </li>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/primitives/docs/guides/styling" className="text-gray-500">
                    Styling
                  </Link>
                </Text>
              </li>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/primitives/docs/overview/accessibility" className="text-gray-500">
                    Accessibility
                  </Link>
                </Text>
              </li>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/primitives/docs/overview/releases" className="text-gray-500">
                    Releases
                  </Link>
                </Text>
              </li>
            </ul>
          </Box>
        )}
        {isColors && (
          <Box>
            <Heading as="h6" size="3">
              Docs
            </Heading>
            <ul>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/colors/docs/overview/installation" className="text-gray-500">
                    Installation
                  </Link>
                </Text>
              </li>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/colors/docs/palette-composition/scales" className="text-gray-500">
                    Scales
                  </Link>
                </Text>
              </li>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/colors/docs/palette-composition/composing-a-palette" className="text-gray-500">
                    Palette composition
                  </Link>
                </Text>
              </li>
              <li>
                <Text as="p" size="2" mt="3">
                  <Link to="/colors/docs/palette-composition/understanding-the-scale" className="text-gray-500">
                    Understanding the scale
                  </Link>
                </Text>
              </li>
            </ul>
          </Box>
        )}
        <Box>
          <Heading as="h6" size="3">
            Community
          </Heading>
          <ul>
            <li>
              <Text as="p" size="2" mt="3">
                <RadixLink
                  href="https://github.com/radix-ui"
                  color="gray"
                  target="_blank"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  GitHub
                  <Flex asChild ml="2" style={{ color: "var(--gray-8)" }}>
                    <ArrowTopRightIcon />
                  </Flex>
                </RadixLink>
              </Text>
            </li>
            <li>
              <Text as="p" size="2" mt="3">
                <RadixLink
                  href="https://twitter.com/radix_ui"
                  color="gray"
                  target="_blank"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  Twitter
                  <Flex asChild ml="2" style={{ color: "var(--gray-8)" }}>
                    <ArrowTopRightIcon />
                  </Flex>
                </RadixLink>
              </Text>
            </li>
            <li>
              <Text as="p" size="2" mt="3">
                <RadixLink
                  href="https://discord.com/invite/7Xb99uG"
                  color="gray"
                  target="_blank"
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  Discord
                  <Flex asChild ml="2" style={{ color: "var(--gray-8)" }}>
                    <ArrowTopRightIcon />
                  </Flex>
                </RadixLink>
              </Text>
            </li>
          </ul>
        </Box>
      </footer>
    </Grid>
  );
};