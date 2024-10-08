// app/routes/_docs+/docs.$slug.tsx

import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { QuickNav } from "#app/creemson/components/common/navigation/QuickNav";
import { MDXProvider, components } from "#app/creemson/components/docs/MDXComponents";
import { OldVersionNote } from "#app/creemson/components/docs/OldVersionNote";
import { type Frontmatter } from "#app/creemson/types/frontmatter";
import { getPackageData, formatBytes } from "#app/creemson/utils/bundlephobia";
import { getAllVersionsFromPath, getMdxBySlug } from "#app/creemson/utils/mdx";

type LoaderData = {
  frontmatter: Frontmatter & {
    version: string;
    versions: string[];
    gzip: string | null;
  };
  code: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params.slug ?? '';  // Ensure slug is a string or empty string
  const { frontmatter, code } = await getMdxBySlug(
    "primitives/docs/components/",
    slug
  );
  const [componentName, componentVersion] = (slug ?? '').split("/");  // Prevent split on undefined

  const packageData = frontmatter.name
    ? await getPackageData(frontmatter.name, componentVersion ?? "").catch(() => null)  // Handle undefined componentVersion
    : null;

  const versions = await getAllVersionsFromPath(
    `primitives/docs/components/${componentName}`
  );

  const extendedFrontmatter: Frontmatter & { version: string; versions: string[]; gzip: string | null } = {
    ...frontmatter,
    version: componentVersion ?? "",  // Ensure componentVersion is a string
    versions,
    gzip: packageData?.gzip ? (formatBytes(packageData.gzip) as string | null) : null,  // Correct handling of gzip
  };

  return json<LoaderData>({ frontmatter: extendedFrontmatter, code });
};

export default function ComponentsDoc() {
  const { frontmatter, code } = useLoaderData<LoaderData>();
  const Component = getMDXComponent(code);

  return (
    <>
      <div data-algolia-lvl0 style={{ display: "none" }}>
        Components
      </div>

      {frontmatter.version !== frontmatter.versions?.[0] && (
        <OldVersionNote
          name={frontmatter.metaTitle}
          href={`/primitives/docs/components/${frontmatter.slug.replace(
            frontmatter.version ?? "",
            ""
          )}`}
        />
      )}

      <MDXProvider frontmatter={frontmatter}>
        <Component components={components as any} />
      </MDXProvider>

      <QuickNav key={frontmatter.slug} />
    </>
  );
}
