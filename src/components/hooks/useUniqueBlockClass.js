import { useSelect } from '@wordpress/data';
import { useRef, useEffect } from '@wordpress/element';
import { generateUniqueClass } from '../../components/utils/generateUniqueClass';

export function useUniqueBlockClass({ clientId, uniqueClass, setAttributes, blockName }) {
  const hasDuplicateUniqueClass = useSelect((select) => {
    const { getBlocks } = select('core/block-editor');
    const allBlocks = getBlocks();

    return allBlocks.some(
      (block) =>
        block.clientId !== clientId &&
        block.attributes.uniqueClass === uniqueClass
    );
  }, [clientId, uniqueClass]);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    if (!uniqueClass || hasDuplicateUniqueClass) {
      const newClass = generateUniqueClass(blockName);
      setAttributes({ uniqueClass: newClass });
    }

    hasInitialized.current = true;
  }, [clientId, uniqueClass, hasDuplicateUniqueClass, setAttributes, blockName]);
}
