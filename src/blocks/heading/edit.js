import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { TabPanel, PanelBody } from '@wordpress/components';
import { cog, styles } from '@wordpress/icons';
import IconSettings from '../../components/settings/IconSettings';
import HeadingTag from '../../components/settings/HeadingTag';
import DynamicContentSettings from '../../components/settings/DynamicContentSettings';
import CustomLinkControl from '../../components/settings/CustomLinkControl';
import StyleTabs from '../../components/style/StyleTabs';
import { useUniqueBlockClass } from '../../components/hooks/useUniqueBlockClass';
import { SpacingControls, LayoutControls, SizingControl, TypographyControl, BackgroundControl, BorderControl, PositionControl, EffectControl, CustomCssControl } from '../../components/style-controls';
import { DeviceProvider } from '../../components/controls/DeviceContext';
import { useDeviceSettings, generateBlockStyles } from '../../components/controls/blockStyles';
import ResponsiveControl from '../../components/controls/ResponsiveControl';
import { iconLibrary } from '../../icons';
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { content, iconType, iconName, iconCategory, customIcon, iconColor, iconLocation, tagName, dynamicTag, selectedTag, sourceType, postId, postType, linkOption, anchor, uniqueClass, customLink, padding, margin, display, alignItems, justifyContent, justifyItems, justifySelf, alignSelf, gridTemplateColumns, gridTemplateRows, columnGap, rowGap, gridAutoFlow, gridColumn, gridRow, order, flexDirection, flexWrap, flexGrow, flexShrink, flexBasis, float, clear, width, height, minWidth, minHeight, maxWidth, maxHeight, aspectRatio, textColor, fontSize, fontWeight, fontStyle, textAlign, textTransform, textDecoration, lineHeight, letterSpacing, fontFamily, backgroundColor, backgroundLayers, border, borderRadius, position, inset, overflowX, overflowY, zIndex, effect, customCss } = attributes;

  const [dynamicContent, setDynamicContent] = useState('');
  const [postLink, setPostLink] = useState('#');
  const [authorLink, setAuthorLink] = useState('#');
  const [activeStyleTab, setActiveStyleTab] = useState('main');
  const devices = useDeviceSettings();

  const Tag = tagName || 'h2';

  useUniqueBlockClass({ clientId, uniqueClass, setAttributes, blockName: 'axcelersblocks-heading' });

  const blockProps = useBlockProps({
    id: anchor || undefined,
    className: ['axcelersblocks-heading__text', uniqueClass].filter(Boolean).join(' '),
  });

  const { currentPostId, currentPostType } = useSelect((select) => {
    const { getCurrentPostId, getCurrentPostType } = select('core/editor');
    return { currentPostId: getCurrentPostId(), currentPostType: getCurrentPostType() };
  }, []);

  const [currentPostRestBase, setCurrentPostRestBase] = useState(currentPostType);

  useEffect(() => {
    if (currentPostType) {
      apiFetch({ path: '/wp/v2/types' })
        .then((typesData) => {
          const typeData = typesData[currentPostType];
          setCurrentPostRestBase(typeData?.rest_base || currentPostType);
        })
        .catch(() => setCurrentPostRestBase(currentPostType));
    }
  }, [currentPostType]);

  useEffect(() => {
    if (sourceType === 'current' && currentPostId && (postId !== currentPostId.toString() || postType !== currentPostType)) {
      setAttributes({ postId: currentPostId.toString(), postType: currentPostType });
    } else if (sourceType === 'specific' && postId === currentPostId.toString()) {
      setAttributes({ postId: '' });
    }
  }, [sourceType, currentPostId, currentPostType, postId, postType, setAttributes]);

  useEffect(() => {
    if (!dynamicTag) {
      setDynamicContent('');
      setPostLink('#');
      setAuthorLink('#');
      return;
    }

    const endpoint = (sourceType === 'current' && currentPostId)
      ? `/wp/v2/${currentPostRestBase}/${currentPostId}`
      : (sourceType === 'specific' && postId && postType)
        ? `/wp/v2/${postType}/${postId}`
        : null;

    if (!endpoint) {
      setDynamicContent(dynamicTag);
      setPostLink('#');
      setAuthorLink('#');
      return;
    }

    apiFetch({ path: endpoint })
      .then((postData) => {
        setPostLink(postData.link || '#');

        if (selectedTag === 'post_title') {
          setDynamicContent(postData.title.rendered || 'Untitled');
        }

        if (selectedTag === 'post_author') {
          if (postData.author) {
            apiFetch({ path: `/wp/v2/users/${postData.author}` })
              .then((authorData) => {
                setDynamicContent(authorData.name || 'Unknown Author');
                setAuthorLink(authorData.link || '#');
              })
              .catch(() => {
                setDynamicContent('Error fetching author');
                setAuthorLink('#');
              });
          } else {
            setDynamicContent('No author found');
            setAuthorLink('#');
          }
        }
      })
      .catch(() => {
        setDynamicContent('Error fetching post');
        setPostLink('#');
        setAuthorLink('#');
      });
  }, [dynamicTag, selectedTag, sourceType, postId, postType, currentPostId, currentPostRestBase]);

  const renderIcon = () => {
    if (iconType === 'library' && iconCategory && iconName) {
      const IconComponent = iconLibrary[iconCategory]?.[iconName];
      return IconComponent ? <span className="heading-icon"><IconComponent /></span> : null;
    }
    if (iconType === 'custom' && customIcon?.includes('<svg')) {
      return <span className="heading-icon" dangerouslySetInnerHTML={{ __html: customIcon }} />;
    }
    return null;
  };

  const renderContent = () => {
    if (!dynamicTag) {
      return (
        <RichText
          tagName="span"
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          placeholder={__('Enter heading…', 'axcelersblocks')}
          className="heading-text"
          allowedFormats={['core/bold', 'core/italic']}
        />
      );
    }

    return dynamicContent || dynamicTag;
  };

  const combinedContent = <>{iconLocation === 'before' && renderIcon()}{renderContent()}{iconLocation === 'after' && renderIcon()}</>;

	const wrappedContent = (() => {
    let innerContent = combinedContent;

    if (dynamicTag) {
			if (selectedTag === 'post_title' && linkOption === 'post' && postId) {
				innerContent = <a href={postLink} target="_blank" rel="noopener noreferrer">{combinedContent}</a>;
			}

			if (selectedTag === 'post_author') {
				if (linkOption === 'post') {
					innerContent = <a href={postLink} target="_blank" rel="noopener noreferrer">{combinedContent}</a>;
				}
				if (linkOption === 'author') {
					innerContent = <a href={authorLink} target="_blank" rel="noopener noreferrer">{combinedContent}</a>;
				}
			}
    }

    // Always prioritize customLink finally
    if (customLink) {
      return <a href={customLink} target="_blank" rel="noopener noreferrer">{innerContent}</a>;
    }

    return innerContent;
	})();

  return (
    <>
      <InspectorControls>
        <TabPanel className="axcelersblocks-tabs" activeClass="is-active" tabs={[
          { name: 'settings', title: <>{cog}</>, className: 'settings-tab' },
          { name: 'style', title: <>{styles}</>, className: 'style-tab' },
        ]}>
          {(tab) => (
            <>
              {tab.name === 'settings' && (
                <PanelBody title="Heading" initialOpen>
                  <div className="axcelersblocks-settings-section">
                    <h3 className="axcelersblocks-settings-title">{__('Icon', 'axcelersblocks')}</h3>
                    <IconSettings attributes={attributes} setAttributes={setAttributes} />
                  </div>
                  <hr className="axcelersblocks-divider" />
                  <div className="axcelersblocks-settings-section">
                    <h3 className="axcelersblocks-settings-title">{__('Tag', 'axcelersblocks')}</h3>
                    <HeadingTag value={tagName} onChange={(value) => setAttributes({ tagName: value })} />
                    <CustomLinkControl attributes={attributes} setAttributes={setAttributes} />
                  </div>
                  <hr className="axcelersblocks-divider" />
                  <div className="axcelersblocks-settings-section">
                    <h3 className="axcelersblocks-settings-title">{__('Dynamic Data', 'axcelersblocks')}</h3>
                    <DynamicContentSettings attributes={attributes} setAttributes={setAttributes} allowedTags={['post_title', 'post_author']} />
                  </div>
                </PanelBody>
              )}
              {tab.name === 'style' && (
                <DeviceProvider>
                  <div className="axcelersblocks-style-tab-wrapper">
                    <ResponsiveControl renderControl={() => (
                      <StyleTabs
                        uniqueClass={uniqueClass}
                        activeTab={activeStyleTab}
                        setActiveTab={setActiveStyleTab}
                        iconSelector=".heading-icon svg"
                        renderContent={(currentTab) => currentTab === 'main' && (
                          <>
                            <LayoutControls attributes={attributes} setAttributes={setAttributes} />
                            <SpacingControls attributes={attributes} setAttributes={setAttributes} />
                            <SizingControl attributes={attributes} setAttributes={setAttributes} />
                            <TypographyControl attributes={attributes} setAttributes={setAttributes} />
                            <BackgroundControl attributes={attributes} setAttributes={setAttributes} />
                            <BorderControl attributes={attributes} setAttributes={setAttributes} />
                            <PositionControl attributes={attributes} setAttributes={setAttributes} />
                            <EffectControl attributes={attributes} setAttributes={setAttributes} />
                            <CustomCssControl attributes={attributes} setAttributes={setAttributes} />
                          </>
                        )}
                      />
                    )} />
                  </div>
                </DeviceProvider>
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      <style>{generateBlockStyles(uniqueClass, devices, { padding, margin, display, iconColor, alignItems, justifyContent, justifyItems, justifySelf, alignSelf, gridTemplateColumns, gridTemplateRows, columnGap, rowGap, gridAutoFlow, gridColumn, gridRow, order, flexDirection, flexWrap, flexGrow, flexShrink, flexBasis, float, clear, width, height, minWidth, minHeight, maxWidth, maxHeight, aspectRatio, textColor, fontSize, fontWeight, fontStyle, textAlign, textTransform, textDecoration, lineHeight, letterSpacing, fontFamily, backgroundColor, backgroundLayers, border, borderRadius, position, inset, overflowX, overflowY, zIndex, effect, customCss })}</style>

      <Tag {...blockProps}>{wrappedContent}</Tag>
    </>
  );
}
