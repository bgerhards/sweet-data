import { getShift } from '../common';

export const xml = (text: string, options: object): Promise<string> => {
  return new Promise(function (resolve, reject) {
    const shift = getShift(options);

    try {
      let ar = text.replace(/>\s{0,}</g, "><")
        .replace(/</g, "~::~<")
        .replace(/xmlns\:/g, "~::~xmlns:")
        .replace(/xmlns\=/g, "~::~xmlns=")
        .split('~::~'),
        len = ar.length,
        inComment = false,
        deep = 0,
        str = '',
        ix = 0;

      for (ix = 0; ix < len; ix++) {
        // start comment or <![CDATA[...]]> or <!DOCTYPE //
        if (ar[ix].search(/<!/) > -1) {
          str += this.shift[deep] + ar[ix];
          inComment = true;
          // end comment  or <![CDATA[...]]> //
          if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1) {
            inComment = false;
          }
        } else {
          // end comment  or <![CDATA[...]]> //
          if (ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
            str += ar[ix];
            inComment = false;
          } else {
            const a = /^<\w/.exec(ar[ix - 1]) && /^<\/\w/.exec(ar[ix]);
            const b = /^<[\w:\-\.\,]+/.exec(ar[ix - 1]) as any;
            const c = /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/', '');
            // <elm></elm> //
            if (a && (b == c)) {
              str += ar[ix];
              if (!inComment) {
                deep--;
              }
            } else {
              // <elm> //
              if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) === -1 && ar[ix].search(/\/>/) === -1) {
                str = !inComment ? str += this.shift[deep++] + ar[ix] : str += ar[ix];
              } else {
                // <elm>...</elm> //
                if (ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
                  str = !inComment ? str += this.shift[deep] + ar[ix] : str += ar[ix];
                } else {
                  // </elm> //
                  if (ar[ix].search(/<\//) > -1) {
                    str = !inComment ? str += this.shift[--deep] + ar[ix] : str += ar[ix];
                  } else {
                    // <elm/> //
                    if (ar[ix].search(/\/>/) > -1) {
                      str = !inComment ? str += this.shift[deep] + ar[ix] : str += ar[ix];
                    } else {
                      // <? xml ... ?> //
                      if (ar[ix].search(/<\?/) > -1) {
                        str += this.shift[deep] + ar[ix];
                      } else {
                        // xmlns //
                        if (ar[ix].search(/xmlns\:/) > -1 || ar[ix].search(/xmlns\=/) > -1) {
                          str += this.shift[deep] + ar[ix];
                        }

                        else {
                          str += ar[ix];
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      resolve((str[0] == '\n') ? str.slice(1) : str);
    } catch (e) {
      reject(e);
    }
  });
};

export const xmlmin = (text: string, preserveComments: boolean): Promise<string> => {
  return new Promise(function (resolve, reject) {
    try {
      const str = preserveComments ? text : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g, "");

      resolve(str.replace(/>\s{0,}</g, "><"));
    } catch (e) {
      reject(e);
    }
  });
};
