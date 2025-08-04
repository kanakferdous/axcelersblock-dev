import { __ } from '@wordpress/i18n';
import { PanelBody, Button } from '@wordpress/components';
import { layout } from '@wordpress/icons';
import { useDevice } from '../../controls/DeviceContext';
import Display from './Display';
import Alignment from './Alignment';
import GridLayout from './Grid';
import FlexLayout from './Flex';
import Floats from './Floats';

export default function LayoutControls({ attributes, setAttributes }) {
  const { activeDevice } = useDevice();

  const display = attributes.display || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const alignItems = attributes.alignItems || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const justifyContent = attributes.justifyContent || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const justifyItems = attributes.justifyItems || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const justifySelf = attributes.justifySelf || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const alignSelf = attributes.alignSelf || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const gridTemplateColumns = attributes.gridTemplateColumns || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const gridTemplateRows = attributes.gridTemplateRows || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const columnGap = attributes.columnGap || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const rowGap = attributes.rowGap || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const gridAutoFlow = attributes.gridAutoFlow || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const gridColumn = attributes.gridColumn || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const gridRow = attributes.gridRow || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const order = attributes.order || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const flexDirection = attributes.flexDirection || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const flexWrap = attributes.flexWrap || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const flexGrow = attributes.flexGrow || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const flexShrink = attributes.flexShrink || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const flexBasis = attributes.flexBasis || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const float = attributes.float || {
    desktop: '',
    tablet: '',
    mobile: '',
  };
  const clear = attributes.clear || {
    desktop: '',
    tablet: '',
    mobile: '',
  };

  const updateDeviceAttribute = (attribute, value) => {
    setAttributes({
      [attribute]: {
        ...attributes[attribute],
        [activeDevice]: value,
      },
    });
  };

  const resetLayout = () => {
    const resetAttributes = {
      display: { ...attributes.display, [activeDevice]: '' },
      alignItems: { ...attributes.alignItems, [activeDevice]: '' },
      justifyContent: { ...attributes.justifyContent, [activeDevice]: '' },
      justifyItems: { ...attributes.justifyItems, [activeDevice]: '' },
      justifySelf: { ...attributes.justifySelf, [activeDevice]: '' },
      alignSelf: { ...attributes.alignSelf, [activeDevice]: '' },
      gridTemplateColumns: { ...attributes.gridTemplateColumns, [activeDevice]: '' },
      gridTemplateRows: { ...attributes.gridTemplateRows, [activeDevice]: '' },
      columnGap: { ...attributes.columnGap, [activeDevice]: '' },
      rowGap: { ...attributes.rowGap, [activeDevice]: '' },
      gridAutoFlow: { ...attributes.gridAutoFlow, [activeDevice]: '' },
      gridColumn: { ...attributes.gridColumn, [activeDevice]: '' },
      gridRow: { ...attributes.gridRow, [activeDevice]: '' },
      order: { ...attributes.order, [activeDevice]: '' },
      flexDirection: { ...attributes.flexDirection, [activeDevice]: '' },
      flexWrap: { ...attributes.flexWrap, [activeDevice]: '' },
      flexGrow: { ...attributes.flexGrow, [activeDevice]: '' },
      flexShrink: { ...attributes.flexShrink, [activeDevice]: '' },
      flexBasis: { ...attributes.flexBasis, [activeDevice]: '' },
      float: { ...attributes.float, [activeDevice]: '' },
      clear: { ...attributes.clear, [activeDevice]: '' },
    };
    setAttributes(resetAttributes);
  };

  return (
    <PanelBody
      className="layout-controls-wrapper"
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="title">
            {layout}
            {__('Layout', 'axcelersblocks')}
          </span>
        </div>
      }
      initialOpen={false}
    >
      <Display
        activeDevice={activeDevice}
        display={display}
        updateDeviceAttribute={updateDeviceAttribute}
      />
      <Alignment
        activeDevice={activeDevice}
        alignItems={alignItems}
        justifyContent={justifyContent}
        justifyItems={justifyItems}
        justifySelf={justifySelf}
        alignSelf={alignSelf}
        updateDeviceAttribute={updateDeviceAttribute}
      />
      <GridLayout
        activeDevice={activeDevice}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        columnGap={columnGap}
        rowGap={rowGap}
        gridAutoFlow={gridAutoFlow}
        gridColumn={gridColumn}
        gridRow={gridRow}
        order={order}
        updateDeviceAttribute={updateDeviceAttribute}
      />
      <FlexLayout
        activeDevice={activeDevice}
        flexDirection={flexDirection}
        flexWrap={flexWrap}
        columnGap={columnGap}
        rowGap={rowGap}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        flexBasis={flexBasis}
        order={order}
        updateDeviceAttribute={updateDeviceAttribute}
      />
      <Floats
        activeDevice={activeDevice}
        float={float}
        clear={clear}
        updateDeviceAttribute={updateDeviceAttribute}
      />
      <Button
        className="reset-btn"
        onClick={resetLayout}
        label={__('Reset', 'axcelersblocks')}
        showTooltip={true}
      >
        {__('Reset', 'axcelersblocks')}
      </Button>
    </PanelBody>
  );
}
