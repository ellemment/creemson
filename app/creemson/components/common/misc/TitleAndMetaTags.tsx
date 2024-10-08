import { MetaFunction } from "@remix-run/react";

type TitleAndMetaTagsProps = {
  title?: string;
  description?: string;
  image?: string | null;
  url?: string;
  pathname?: string;
};

export const generateMetaTags = ({
  title = "Radix UI",
  description = "Everything you need to build a design system, website or web app.",
  image,
  url = "https://radix-ui.com",
  pathname,
}: TitleAndMetaTagsProps) => {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${url}/social/${image}`
    : null;

  const fullUrl = `${url}${pathname || ''}`;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:url", content: fullUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    ...(imageUrl ? [{ property: "og:image", content: imageUrl }] : []),
    { name: "twitter:site", content: "@radix_ui" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
};
