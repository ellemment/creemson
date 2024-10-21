import { json, type HeadersFunction, type LoaderFunctionArgs } from "@remix-run/node";
import  { type MetaFunction , useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getMeta } from "#app/components/keynote/meta";
import { ScrollExperience } from "#app/components/keynote/scroll-ux";
import { getMarkdownTutPage } from "#app/utils/markdown/scroll/mdslides.server.js";


export const meta: MetaFunction<typeof loader> = (args) => {
    let { siteUrl } = args.data || {};
    let title = "Remix - Build Better Websites";
    let image = siteUrl ? `${siteUrl}/img/og.1.jpg` : undefined;
    let description =
        "Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, slick, and resilient user experience. People are gonna love using your stuff.";

    return getMeta({ title, description, siteUrl, image });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
    let [[sample], [sampleSm], [, mutations], [, errors]] = await Promise.all([
        getMarkdownTutPage("md/marketing/sample/sample.md"),
        getMarkdownTutPage("md/marketing/sample-sm/sample.md"),
        getMarkdownTutPage("md/marketing/mutations/mutations.md"),
        getMarkdownTutPage("md/marketing/mutations/errors.md"),
    ]);

    if (!sample || !sampleSm || !mutations || !errors) {
        throw new Response("Not Found", { status: 404 });
    }

    invariant(sample.type === "prose", "sample.md should be prose");
    invariant(sampleSm.type === "prose", "sample.md should be prose");
    invariant(mutations.type === "sequence", "mutations.md should be a sequence");
    invariant(errors.type === "sequence", "errors.md should be a sequence");

    let requestUrl = new URL(request.url);
    let siteUrl = requestUrl.protocol + "//" + requestUrl.host;

    return json(
        {
            sample,
            sampleSm,
            siteUrl,
            mutations,
            errors,
        },
    );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
    // Inherit the caching headers from the loader so we don't cache 404s
    return loaderHeaders;
};

export default function Index() {
    let { mutations, errors } = useLoaderData<typeof loader>();
    return (
        <div x-comp="Index">
            <ScrollExperience mutations={mutations} errors={errors} />
        </div>
    );
}



