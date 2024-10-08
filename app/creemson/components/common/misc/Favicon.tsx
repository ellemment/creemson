import { useTheme } from "next-themes";
import React, { useEffect } from "react";

export function Favicon() {
	const { theme, systemTheme } = useTheme();
  
	useEffect(() => {
	  const favicon = document.querySelector('link[rel="icon"]');
	  if (favicon) {
		favicon.remove();
	  }
  
	  const newFavicon = document.createElement('link');
	  newFavicon.rel = 'icon';
  
	  if (theme === 'system') {
		newFavicon.href = systemTheme === 'dark' ? '/favicon-white.svg' : '/favicon-black.svg';
	  } else {
		newFavicon.href = theme === 'dark' ? '/favicon-white.svg' : '/favicon-black.svg';
	  }
  
	  document.head.appendChild(newFavicon);
	}, [theme, systemTheme]);
  
	return null;
  }
  