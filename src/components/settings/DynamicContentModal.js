import { __ } from '@wordpress/i18n';
import { Modal, Button, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

const dynamicTagOptions = [
  { label: 'Post Title', value: 'post_title' },
  { label: 'Post Excerpt', value: 'post_excerpt' },
  { label: 'Post Permalink', value: 'post_permalink' },
  { label: 'Post Date', value: 'post_date' },
  { label: 'Featured Image', value: 'featured_image' },
  { label: 'Post Meta', value: 'post_meta' },
  { label: 'Comments Count', value: 'comments_count' },
  { label: 'Comments URL', value: 'comments_url' },
  { label: 'Term List', value: 'term_list' },
	{ label: 'Author', value: 'post_author' },
];

const DynamicContentModal = ({ isOpen, onClose, onInsert, attributes, setAttributes, allowedTags }) => {
  const { selectedTag, sourceType, postId, postType, linkOption } = attributes;
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [required, setRequired] = useState(true);
	const filteredDynamicTagOptions = dynamicTagOptions.filter(opt =>
		!allowedTags || allowedTags.includes(opt.value)
	);

  useEffect(() => {
    if (!isOpen || sourceType !== 'specific') return;

    setIsLoading(true);

    apiFetch({ path: '/wp/v2/types' })
      .then((typesData) => {
        const filteredTypes = Object.values(typesData).filter(
          (type) =>
            type.rest_base &&
            !type.slug.startsWith('wp_') &&
            !['attachment', 'nav_menu_item'].includes(type.slug)
        );

        const fetches = filteredTypes.map((type) =>
          apiFetch({ path: `/wp/v2/${type.rest_base}?per_page=100` })
            .then((posts) => ({
              type: type.slug,
              restBase: type.rest_base,
              label: type.name,
              posts,
            }))
            .catch(() => ({
              type: type.slug,
              restBase: type.rest_base,
              label: type.name,
              posts: [],
            }))
        );

        return Promise.all(fetches);
      })
      .then((results) => {
        const grouped = {};
        results.forEach((group) => {
          grouped[group.type] = {
            label: group.label,
            restBase: group.restBase,
            posts: group.posts,
          };
        });
        setPosts(grouped);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sourceType, isOpen]);

  const buildDynamicTag = () => {
    let tag = `{{${selectedTag}`;
    if (sourceType === 'specific' && postId && postType) {
      tag += ` type:${postType} id:${postId}`;
    }
    if (linkOption !== 'none') {
      tag += `|link:${linkOption}`;
    }
    tag += '}}';
    return tag;
  };

  const handleInsert = () => {
    const newTag = buildDynamicTag();
    setAttributes({
      dynamicTag: newTag,
      selectedTag,
      sourceType,
      postId,
      postType,
      linkOption,
      content: '',
    });
    onInsert(newTag);
    onClose();
  };

  const options = [{ label: 'Select a post', value: '' }];

  Object.entries(posts).forEach(([type, { label, restBase, posts: postList }]) => {
    if (postList.length > 0) {
      options.push({ label, value: '', disabled: true });
      options.push(
        ...postList.map((p) => ({
          label: `#${p.id} ${p.title.rendered}`,
          value: p.id.toString(),
          postType: restBase,
        }))
      );
    }
  });

	const getLinkOptions = () => {
		switch (selectedTag) {
			case 'term_list':
				return [
					{ label: 'None', value: 'none' },
					{ label: 'Post', value: 'post' },
					{ label: 'Term', value: 'term' },
				];
			case 'post_author':
				return [
					{ label: 'None', value: 'none' },
					{ label: 'Post', value: 'post' },
					{ label: 'Author', value: 'author' },
				];
			default:
				return [
					{ label: 'None', value: 'none' },
					{ label: 'Post', value: 'post' },
				];
		}
	};

  return isOpen ? (
    <Modal
      title={__('Dynamic Tags', 'axcelersblocks')}
      onRequestClose={onClose}
      className="axcelersblocks-dynamic-tag-modal"
    >
			<SelectControl
				label={__('Select a Dynamic Tag', 'axcelersblocks')}
				value={selectedTag}
				onChange={(value) => setAttributes({ selectedTag: value })}
				options={filteredDynamicTagOptions}
			/>

      <SelectControl
        label={__('Source', 'axcelersblocks')}
        value={sourceType}
        onChange={(value) => {
          setAttributes({
            sourceType: value,
            postId: value === 'current' ? '' : postId,
          });
        }}
        options={[
          { label: 'Current Post', value: 'current' },
          { label: 'Specific Post', value: 'specific' },
        ]}
      />

      {sourceType === 'specific' && (
        <SelectControl
          label={__('Select Source Post', 'axcelersblocks')}
          value={postId || ''}
          onChange={(value) => {
            let selected = null;
            Object.entries(posts).forEach(([type, { restBase, posts: postList }]) => {
              const match = postList.find((p) => p.id.toString() === value);
              if (match) {
                selected = { postId: value, postType: restBase };
              }
            });
            if (selected) {
              setAttributes({
                postId: selected.postId,
                postType: selected.postType,
              });
            }
          }}
          options={isLoading ? [{ label: __('Loading...', 'axcelersblocks'), value: '' }] : options}
        />
      )}

			<SelectControl
				label={__('Link To', 'axcelersblocks')}
				value={linkOption}
				onChange={(value) => setAttributes({ linkOption: value })}
				options={getLinkOptions()}
			/>

      <TextControl
        label={__('Dynamic Tag to Insert', 'axcelersblocks')}
        value={buildDynamicTag()}
        readOnly
      />

      <ToggleControl
        label={__('Required to render', 'axcelersblocks')}
        checked={required}
        onChange={(val) => setRequired(val)}
      />

      <Button
        variant="primary"
        onClick={handleInsert}
        style={{ marginTop: '16px' }}
      >
        {__('Insert dynamic tag', 'axcelersblocks')}
      </Button>
    </Modal>
  ) : null;
};

export default DynamicContentModal;
