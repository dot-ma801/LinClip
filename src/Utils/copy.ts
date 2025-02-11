/**
 * クリップボードに指定した値をコピーする
 *
 * @param value - コピーするデータの内容
 * @param succsessCallBack - コピー成功時に呼び出されるコールバック関数
 * @param faildCallBack - コピー失敗時に呼び出されるコールバック関数
 */
export const copyToClipbord = (value: ClipboardItem, succsessCallBack?: () => void, faildCallBack?: () => void) => {
	navigator.clipboard.write([value]).then(succsessCallBack).catch(faildCallBack);
};
