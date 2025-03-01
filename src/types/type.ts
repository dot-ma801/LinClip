interface DataItem {
  url_regex: string;
  btns: Button[];
}

interface Button {
  btn_name: string;
  type: 'text' | 'html' | 'markdown';
  pattern: string;
}

export type ConfigData = {
  data: DataItem[];
};

// 動作確認用の宣言
const configJson = `{
  "data": [
    {
      "url_regex": "https://**",
      "btns": [
        {
          "btn_name": "btn1",
          "type": "text",
          "pattern": "red#{$url$1} - {$url$2}"
        },
        {
          "btn_name": "btn2",
          "type": "html",
          "pattern": "blue#{$url$1} - {tab}"
        },
                {
          "btn_name": "btn2",
          "type": "html",
          "pattern": "blue#{$url$1} - {tab}"
        }
      ]
    },
    {
      "url_regex": "https://**",
      "btns": [
        {
          "btn_name": "btn3",
          "type": "markdown",
          "pattern": "red#{$url$1} - {$url$2}"
        }
      ]
    }
  ]
}`;

export const configForTest: ConfigData = JSON.parse(configJson);
