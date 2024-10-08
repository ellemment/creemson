import { Box, Link, Separator } from "@radix-ui/themes";
import { useLocation, useParams } from "@remix-run/react";
import * as React from "react";

const DATA_FOLDER_PATH = "https://github.com/radix-ui/website/edit/main/data";

export function EditPageLink() {
  const location = useLocation();
  const params = useParams();

  const getFilePath = () => {
    let filePath = `${DATA_FOLDER_PATH}${location.pathname}`;
    
    // Handle dynamic routes
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          filePath = filePath.replace(`[...${key}]`, value.join("/"));
        } else {
          filePath = filePath.replace(`[${key}]`, value);
        }
      }
    });

    return `${filePath}.mdx`;
  };

  const editUrl = getFilePath();

  return (
    <Box>
      <Separator size="2" my="8" />
      <Link
        href={editUrl}
        title="Edit this page on GitHub."
        rel="noopener noreferrer"
        target="_blank"
        color="gray"
        size="2"
      >
        Edit this page on GitHub.
      </Link>
    </Box>
  );
}