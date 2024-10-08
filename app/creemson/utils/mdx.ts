// app/creemson/utils/mdx.ts

import fs from "fs";
import path from "path";
import { compareVersions } from "compare-versions";
import { globSync } from "glob";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { type Frontmatter } from "#app/creemson/types/frontmatter";

const ROOT_PATH = process.cwd();
export const DATA_PATH = path.join(ROOT_PATH, "data");

// the front matter and content of all mdx files based on `docsPaths`
export const getAllFrontmatter = (fromPath: string) => {
  const PATH = path.join(DATA_PATH, fromPath);
  const paths = globSync(`${PATH}/**/**/*.mdx`);

  return paths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(filePath), "utf8");
      const { data } = matter(source);

      return {
        ...(data as Frontmatter),
        slug: filePath.replace(`${DATA_PATH}/`, "").replace(".mdx", ""),
      } as Frontmatter;
    })
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt!)) - Number(new Date(a.publishedAt!)),
    );
};

export const getMdxBySlug = async (basePath: string, slug: string) => {
  const source = fs.readFileSync(
    path.join(DATA_PATH, basePath, `${slug}.mdx`),
    "utf8",
  );
  const { frontmatter, code } = await bundleMDX({
    source: source,
    // Simplified mdxOptions function
    mdxOptions(options) {
      // You can add any necessary plugins here in the future
      return options;
    },
  });

  return {
    frontmatter: {
      ...(frontmatter as Frontmatter),
      slug,
    } as Frontmatter,
    code,
  };
};

export function getAllVersionsFromPath(fromPath: string) {
  const PATH = path.join(DATA_PATH, fromPath);
  if (!fs.existsSync(PATH)) return [];
  return fs
    .readdirSync(PATH)
    .map((fileName) => fileName.replace(".mdx", ""))
    .sort((a, b) => compareVersions(b, a));
}