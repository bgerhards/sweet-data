export const css = (text: string) => {
  let ar = text.replace(/\s{1,}/g, ' ')
    .replace(/\{/g, "{~::~")
    .replace(/\}/g, "~::~}~::~")
    .replace(/\;/g, ";~::~")
    .replace(/\/\*/g, "~::~/*")
    .replace(/\*\//g, "*/~::~")
    .replace(/~::~\s{0,}~::~/g, "~::~")
    .split('~::~'),
    len = ar.length,
    deep = 0,
    str = '',
    ix = 0;

  for (ix = 0; ix < len; ix++) {

    if (/\{/.exec(ar[ix])) {
      str += this.shift[deep++] + ar[ix];
    } else
      if (/\}/.exec(ar[ix])) {
        str += this.shift[--deep] + ar[ix];
      } else
        if (/\*\\/.exec(ar[ix])) {
          str += this.shift[deep] + ar[ix];
        }
        else {
          str += this.shift[deep] + ar[ix];
        }
  }

  return str.replace(/^\n{1,}/, '');
};

export const cssmin = (text: string, preserveComments: boolean) => {
  const str = preserveComments ? text
    : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g, "");

  return str.replace(/\s{1,}/g, ' ')
    .replace(/\{\s{1,}/g, "{")
    .replace(/\}\s{1,}/g, "}")
    .replace(/\;\s{1,}/g, ";")
    .replace(/\/\*\s{1,}/g, "/*")
    .replace(/\*\/\s{1,}/g, "*/");
};
