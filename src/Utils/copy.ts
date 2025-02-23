/**
 * クリップボードに指定した値をコピーする
 *
 * @param value - コピーするデータの内容
 * @param successCallBack - コピー成功時に呼び出されるコールバック関数
 * @param failCallBack - コピー失敗時に呼び出されるコールバック関数
 */
export const copyToClipboard = (value: ClipboardItem, successCallBack?: () => void, failCallBack?: () => void) => {
  navigator.clipboard.write([value]).then(successCallBack).catch(failCallBack);
};
