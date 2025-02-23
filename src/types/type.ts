export type Setting = {
  urlPattern: string;
  copyOptions: CopyOption[];
  selectors?: Selector[];
}[];

export type CopyOption = {
  name: string;
  format: 'markdown' | 'blob' | 'text';
  template: string;
};

type Selector = {
  name: string;
  type: 'css' | 'id' | 'class' | 'meta' | 'js';
  query: string;
};
