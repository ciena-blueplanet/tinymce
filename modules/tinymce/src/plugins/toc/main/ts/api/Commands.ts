/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import * as Toc from '../core/Toc';

const register = function (editor) {
  editor.addCommand('mceInsertToc', () => {
    Toc.insertToc(editor);
  });

  editor.addCommand('mceUpdateToc', () => {
    Toc.updateToc(editor);
  });
};

export {
  register
};
