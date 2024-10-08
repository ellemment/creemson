import { canUseDOM } from '#app/creemson/utils/can-use-dom.ts';

export async function copy(text: string) {
	if (!canUseDOM) {
		return;
	}
	try {
		await navigator.clipboard.writeText(text);
	} catch (error) {
		console.error("Copying text is only allowed in a secure context");
	}
}
