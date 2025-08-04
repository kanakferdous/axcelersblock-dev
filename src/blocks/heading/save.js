import { useBlockProps, RichText } from '@wordpress/block-editor';
import { iconLibrary } from '../../icons';

export default function save({ attributes }) {
  const { content, iconType, iconName, iconCategory, customIcon, iconColor, iconLocation, dynamicTag, linkOption, postId, postType, tagName, } = attributes;

  const Tag = tagName || 'h2';
  const blockProps = useBlockProps.save({
    className: 'axcelersblocks-heading__text',
    'data-dynamic-tag': dynamicTag || '',
    'data-post-id': postId || '',
    'data-post-type': postType || '',
    'data-link-option': linkOption || '',
  });

  const renderIcon = () => {
    if (iconType === 'library' && iconCategory && iconName) {
      const IconComponent = iconLibrary[iconCategory]?.[iconName];
      return IconComponent ? (
        <span className="heading-icon" style={{ color: iconColor }}>
          <IconComponent />
        </span>
      ) : null;
    }

    if (iconType === 'custom' && customIcon && customIcon.includes('<svg')) {
      return (
        <span
          className="heading-icon"
          style={{ color: iconColor }}
          dangerouslySetInnerHTML={{ __html: customIcon }}
        />
      );
    }
    return null;
  };

  const innerContent = (
    <>
      {iconLocation === 'before' && renderIcon()}
      {dynamicTag ? (
        <span className="dynamic-content-placeholder">{dynamicTag}</span>
      ) : (
        <RichText.Content tagName="span" value={content} className="heading-text" />
      )}
      {iconLocation === 'after' && renderIcon()}
    </>
  );

  return (
    <Tag {...blockProps}>
      {linkOption === 'post' && postId ? (
        <a href="#" target="_blank" rel="noopener noreferrer">
          {innerContent}
        </a>
      ) : (
        innerContent
      )}
    </Tag>
  );
}
