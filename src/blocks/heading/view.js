document.addEventListener('DOMContentLoaded', () => {
  const dynamicBlocks = document.querySelectorAll('.axcelersblocks-heading__text[data-dynamic-tag]');

  dynamicBlocks.forEach((block) => {
    const dynamicTag = block.getAttribute('data-dynamic-tag');
    const postId = block.getAttribute('data-post-id');
    const postType = block.getAttribute('data-post-type') || 'post';
    const linkOption = block.getAttribute('data-link-option');

    if (!dynamicTag || !postId) {
      console.log('Missing dynamicTag or postId:', { dynamicTag, postId });
      return;
    }

    // Parse dynamicTag: {{post_title id:1|link:post}} → post_title
    const tagMatch = dynamicTag.match(/^{{([^}\s|]+)/);
    const selectedTag = tagMatch ? tagMatch[1] : '';
    if (!selectedTag) {
      console.log('Invalid dynamicTag format:', dynamicTag);
      return;
    }

		const apiRoot = window.wpApiSettings?.root || '/wp-json/';
		const apiUrl = `${apiRoot}wp/v2/${postType}/${postId}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((data) => {
        let resolvedContent = '';
        if (selectedTag === 'post_title') {
          resolvedContent = data.title?.rendered || '(No title)';
        } else if (selectedTag === 'post_excerpt') {
          resolvedContent = data.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '(No excerpt)';
        } else {
          resolvedContent = `(Unsupported tag: ${selectedTag})`;
          console.log('Unsupported tag:', selectedTag);
        }
        const resolvedLink = data.link || '#';

        const placeholder = block.querySelector('.dynamic-content-placeholder');
        if (!placeholder) {
          console.log('No placeholder found');
          return;
        }

        placeholder.textContent = resolvedContent;

        if (linkOption === 'post' && resolvedLink) {
          const linkElement = block.querySelector('a');
          if (linkElement) {
            linkElement.href = resolvedLink;
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching dynamic content:', err);
        const placeholder = block.querySelector('.dynamic-content-placeholder');
        if (placeholder) {
          placeholder.textContent = '(Error loading content)';
        }
      });
  });
});
