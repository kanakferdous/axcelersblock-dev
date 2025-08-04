import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import DynamicContentModal from './DynamicContentModal';

const DynamicContentSettings = ({ attributes, setAttributes, allowedTags }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { dynamicTag } = attributes;

  const clearDynamicTag = () => {
    setAttributes({
      dynamicTag: '',
      selectedTag: 'post_title',
      sourceType: 'current',
      postId: '',
			postType: '',
      linkOption: 'none',
      content: '',
    });
  };

  return (
    <>
      <Button className='dynamic-tag-select' variant="secondary" onClick={() => setModalOpen(true)}>
        {dynamicTag ? __('Edit Dynamic Tag', 'axcelersblocks') : __('Add Dynamic Tag', 'axcelersblocks')}
      </Button>
      {dynamicTag && (
        <Button
          variant="link"
          isDestructive
          onClick={clearDynamicTag}
          style={{ marginLeft: '10px' }}
        >
          {__('Clear', 'axcelersblocks')}
        </Button>
      )}
      <DynamicContentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onInsert={() => {}}
        attributes={attributes}
        setAttributes={setAttributes}
				allowedTags={allowedTags}
      />
    </>
  );
};

export default DynamicContentSettings;
