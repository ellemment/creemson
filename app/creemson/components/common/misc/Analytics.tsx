import { useLocation } from "@remix-run/react";
import * as React from "react";
import { handleUrlChange } from '#app/creemson/utils/analytics.ts';

export function Analytics() {
	const location = useLocation();
	
	React.useEffect(() => {
	  const url = location.pathname + location.search;
	  handleUrlChange(url);
	}, [location]);
  
	return null;
  }
