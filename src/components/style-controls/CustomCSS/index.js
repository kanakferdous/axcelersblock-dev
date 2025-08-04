import { __ } from '@wordpress/i18n';
import { PanelBody, Button } from '@wordpress/components';
import CodeLine from '../icons/CodeLine';
import { useState } from '@wordpress/element';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/css/css'; // CSS mode
import 'codemirror/addon/hint/show-hint'; // Autocompletion
import 'codemirror/addon/hint/css-hint'; // CSS-specific hints

export default function CustomCssControl({ attributes, setAttributes }) {
  const { customCss } = attributes;
  const [error, setError] = useState(null);

  const updateCustomCss = (value) => {
    // Basic CSS validation
    if (!isValidCss(value)) {
      setError(__('Invalid CSS detected. Please use only valid CSS syntax (e.g., no JavaScript or HTML).', 'axcelersblocks'));
    } else {
      setError(null);
      setAttributes({ customCss: value });
    }
  };

  const resetCustomCss = () => {
    setAttributes({ customCss: '' });
    setError(null);
  };

  // CSS validation function
  const isValidCss = (css) => {
    if (!css || css.trim() === '') return true; // Allow empty input
    const invalidPatterns = [
      /<\w+.*?>/, // HTML tags
      /function\s*\(/, // JavaScript function
      /console\.log/, // JavaScript console
      /document\./, // DOM manipulation
    ];
    return !invalidPatterns.some(pattern => pattern.test(css));
  };

  // Custom hint function for autocompletion
  const getHints = (editor) => {
    const cursor = editor.getCursor();
    const token = editor.getTokenAt(cursor);
    const suggestions = [
      'color:', 'background:', 'margin:', 'padding:', 'border:', 'font-size:', 'width:', 'height:',
      'display:', 'position:', 'top:', 'right:', 'bottom:', 'left:', 'transform:', 'transition:',
      'px', '%', 'em', 'rem', 'vw', 'vh', 'solid', 'dashed', 'dotted', 'red', 'blue',
    ];
    return {
      list: suggestions.filter(s => s.startsWith(token.string)),
      from: { line: cursor.line, ch: token.start },
      to: { line: cursor.line, ch: token.end },
    };
  };

  return (
    <PanelBody
			className="customCSS-controls-wrapper"
			title={
				<span className="title">
					<CodeLine />
					{__('Custom CSS', 'axcelersblocks')}
				</span>
			}
      initialOpen={false}
    >
      <CodeMirror
        value={customCss || ''}
        options={{
          mode: 'css', // CSS syntax highlighting
          lineNumbers: true,
          theme: 'material', // Optional theme
          extraKeys: { 'Ctrl-Space': 'autocomplete' }, // Trigger autocompletion with Ctrl+Space
          hintOptions: { hint: getHints }, // Custom hints
        }}
        onBeforeChange={(editor, data, value) => updateCustomCss(value)}
        placeholder={__('Enter valid CSS here (e.g., .my-class { color: red; } @media (max-width: 768px) { ... })', 'axcelersblocks')}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button
				className='reset-btn'
        onClick={resetCustomCss}
				label={__('Reset', 'axcelersblocks')}
				showTooltip={true}
      >
        {__('Reset', 'axcelersblocks')}
      </Button>
    </PanelBody>
  );
}
