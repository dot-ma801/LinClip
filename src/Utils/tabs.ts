/**
 * 現在のタブタイトルとURLをまとめて取得する
 *
 * @param ignoreQuery URLに付いてクエリパラメータを無視する
 * @param ignoreAnchor URLについてアンカーを無視する
 * @returns タブタイトル、URL
 */
export const getTabInfo = async (ignoreQuery?: boolean, ignoreAnchor?: boolean) => {
	const title = await getCurrentTabTitle();
	const url = await getCurrentTabUrl(ignoreQuery, ignoreAnchor);

	return { title, url };
};

/**
 * 現在開いているTabのURLを取得する
 *
 * @param ignoreQuery クエリパラメータを無視する
 * @param ignoreAnchor アンカーを無視する
 * @returns 現在のTabのURL
 */
export const getCurrentTabUrl = async (ignoreQuery?: boolean, ignoreAnchor?: boolean) => {
	const tabInfo = await getCurrentTabInfo();
	let url = tabInfo[0].url;

	if (!url) {
		return '';
	}

	if (ignoreQuery) {
		url = url.split('?')[0];
	}

	if (ignoreAnchor) {
		url = url.split('#')[0];
	}

	return url;
};

/**
 * 現在のTabのTitleを取得する
 *
 * @returns 現在のTabのTitle
 */
export const getCurrentTabTitle = async () => {
	const tabInfo = await getCurrentTabInfo();
	return tabInfo[0].title;
};

/**
 * 現在開いているタブの詳細情報を取得する
 *
 * @returns 現在のTabの詳細情報
 */
const getCurrentTabInfo = async () => {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const tabInfo = await chrome.tabs.query(queryOptions);
	return tabInfo;
};
