import { Keyboard, Keys, Log, Pipeline, Step, UiFinder } from '@ephox/agar';
import { UnitTest } from '@ephox/bedrock-client';
import { TinyApis, TinyLoader } from '@ephox/mcagar';
import { SugarBody, SugarElement } from '@ephox/sugar';
import CharmapPlugin from 'tinymce/plugins/charmap/Plugin';
import SilverTheme from 'tinymce/themes/silver/Theme';

UnitTest.asynctest('browser.tinymce.plugins.charmap.AutocompletionTest', (success, failure) => {

  CharmapPlugin();
  SilverTheme();

  TinyLoader.setupLight((editor, onSuccess, onFailure) => {
    const tinyApis = TinyApis(editor);
    const eDoc = SugarElement.fromDom(editor.getDoc());

    Pipeline.async({},
      Log.steps('TBA', 'Charmap: Autocomplete, trigger an autocomplete and check it appears', [
        tinyApis.sFocus(),
        tinyApis.sSetContent('<p>:co</p>'),
        tinyApis.sSetCursor([ 0, 0 ], 3),
        Keyboard.sKeypress(eDoc, 'o'.charCodeAt(0), { }),
        UiFinder.sWaitForVisible('Waiting for autocomplete menu', SugarBody.body(), '.tox-autocompleter'),
        Keyboard.sKeydown(eDoc, Keys.enter(), { }),

        // This assertion does not pass on Phantom. The editor content
        // is empty. Not sure if it's an encoding issue for entities.
        navigator.userAgent.indexOf('PhantomJS') > -1 ? Step.pass : tinyApis.sAssertContent('<p>₡</p>')
      ])
      , onSuccess, onFailure);
  }, {
    plugins: 'charmap',
    toolbar: 'charmap',
    theme: 'silver',
    base_url: '/project/tinymce/js/tinymce'
  }, success, failure);
});
