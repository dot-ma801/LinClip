/**
 * 現在のタブタイトルとURLをまとめて取得する
 *
 * @returns タブタイトル、URL
 */
export const getTabInfo = async () => {
	const title = await getCurrentTabTitle();
	const url = await getCurrentTabUrl();

	return { title, url };
};

/**
 * 現在開いているTabのURLを取得する
 *
 * @returns 現在のTabのURL
 */
export const getCurrentTabUrl = async () => {
	const tabInfo = await getCurentTabInfo();
	return tabInfo[0].url;
};

/**
 * 現在のTabのTitleを取得する
 *
 * @returns 現在のTabのTitle
 */
export const getCurrentTabTitle = async () => {
	const tabInfo = await getCurentTabInfo();
	return tabInfo[0].title;
};

/**
 * 現在開いているタブの詳細情報を取得する
 *
 * @returns 現在のTabの詳細情報
 */
const getCurentTabInfo = async () => {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const tabInfo = await chrome.tabs.query(queryOptions);
	return tabInfo;
};
