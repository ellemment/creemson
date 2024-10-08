
import { TabNav } from "@radix-ui/themes";
import { Link, useSearchParams } from "@remix-run/react";
import * as React from "react";

interface TabNavDemoProps
  extends React.ComponentPropsWithoutRef<typeof TabNav.Root> {
  items?: string[];
  baseUrl: string;
}

const TabNavDemo = React.forwardRef<
  React.ElementRef<typeof TabNav.Root>,
  TabNavDemoProps
>(({ baseUrl, items = ["Account", "Documents"], ...props }, forwardedRef) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab-nav");

  return (
    <TabNav.Root {...props} ref={forwardedRef}>
      {items.map((item, i) => (
        <TabNav.Link
          key={item}
          active={tab === item.toLowerCase() || (i === 0 && tab === null)}
        >
          <Link
            to={`${baseUrl}?tab-nav=${item.toLowerCase()}`}
            preventScrollReset={true}
          >
            {item}
          </Link>
        </TabNav.Link>
      ))}
    </TabNav.Root>
  );
});

TabNavDemo.displayName = "TabNavDemo";

export { TabNavDemo };
export default TabNavDemo;