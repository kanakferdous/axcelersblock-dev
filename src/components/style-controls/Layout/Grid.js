import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, Button, Popover, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';

// SVG icons (only keeping the grid icon for the button)
const gridIcons = {
  'grid': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style="width: 100%;"><rect width="256" height="256" fill="none"></rect><rect x="32" y="56" width="192" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></rect><line x1="96" y1="56" x2="96" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="160" y1="56" x2="160" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="32" y1="104" x2="224" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line><line x1="32" y1="152" x2="224" y2="152" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line></svg>',
};

export default function GridLayout({ activeDevice, gridTemplateColumns, gridTemplateRows, columnGap, rowGap, gridAutoFlow, gridColumn, gridRow, order, updateDeviceAttribute, }) {
  const [isTemplateColumnsPopupOpen, setIsTemplateColumnsPopupOpen] = useState(false);

  // Default grid template column options
  const templateColumnsOptions = [
    { value: '1fr', label: '1fr', columnCount: 1 },
    { value: 'repeat(2, minmax(0, 1fr))', label: '2 Columns', columnCount: 2 },
    { value: 'repeat(3, minmax(0, 1fr))', label: '3 Columns', columnCount: 3 },
    { value: 'repeat(4, minmax(0, 1fr))', label: '4 Columns', columnCount: 4 },
    { value: '1fr 3fr', label: '1fr 3fr', columnCount: 2 },
    { value: '3fr 1fr', label: '3fr 1fr', columnCount: 2 },
    { value: '1fr 1fr 2fr', label: '1fr 1fr 2fr', columnCount: 3 },
    { value: '1fr 2fr 1fr', label: '1fr 2fr 1fr', columnCount: 3 },
    { value: '2fr 1fr 1fr', label: '2fr 1fr 1fr', columnCount: 3 },
    { value: '1fr 3fr 1fr', label: '1fr 3fr 1fr', columnCount: 3 },
    { value: 'repeat(5, minmax(0, 1fr))', label: '5 Columns', columnCount: 5 },
    { value: 'repeat(6, minmax(0, 1fr))', label: '6 Columns', columnCount: 6 },
  ];

  // Helper function to generate column divs based on column count
  const renderColumnDivs = (columnCount) => {
    const divs = [];
    for (let i = 0; i < columnCount; i++) {
      divs.push(<div key={i} className="grid-column-visual" />);
    }
    return divs;
  };

  return (
		<PanelBody
			className='grid-layout-controls-wrap'
      title={__('Grid Layout', 'axcelersblocks')}
      initialOpen={false}
    >
			<div className="grid-layout-controls">
				{/* Grid Template Columns */}
				<div className="grid-template-columns-control">
					<TextControl
						label={__('Grid Template Columns', 'axcelersblocks')}
						value={gridTemplateColumns[activeDevice] || ''}
						onChange={(value) => updateDeviceAttribute('gridTemplateColumns', value)}
					/>
					<Button
						className='grid-default-columns-btn'
						onClick={() => setIsTemplateColumnsPopupOpen(!isTemplateColumnsPopupOpen)}
						aria-label={__('Open Grid Template Columns Options', 'axcelersblocks')}
					>
						<span
							dangerouslySetInnerHTML={{ __html: gridIcons['grid'] }}
						/>
					</Button>
					{isTemplateColumnsPopupOpen && (
						<Popover
							position="bottom right"
							onClose={() => setIsTemplateColumnsPopupOpen(false)}
							className="grid-template-columns-popover"
						>
							<ButtonGroup className="grid-template-columns-options">
								{templateColumnsOptions.map((option) => (
									<Button
										key={option.value}
										onClick={() => {
											updateDeviceAttribute('gridTemplateColumns', option.value);
											setIsTemplateColumnsPopupOpen(false);
										}}
										style={{ '--grid-template-columns': option.value }}
										aria-label={option.label}
										className="grid-template-column-button"
									>
										{renderColumnDivs(option.columnCount)}
									</Button>
								))}
							</ButtonGroup>
						</Popover>
					)}
				</div>

				{/* Grid Template Rows */}
				<TextControl
					label={__('Grid Template Rows', 'axcelersblocks')}
					value={gridTemplateRows[activeDevice] || ''}
					onChange={(value) => updateDeviceAttribute('gridTemplateRows', value)}
				/>
				<div className="gap-controls">
					{/* Column Gap */}
					<TextControl
						label={__('Column Gap', 'axcelersblocks')}
						value={columnGap[activeDevice] || ''}
						onChange={(value) => updateDeviceAttribute('columnGap', value)}
						placeholder="e.g., 0.5em"
					/>

					{/* Row Gap */}
					<TextControl
						label={__('Row Gap', 'axcelersblocks')}
						value={rowGap[activeDevice] || ''}
						onChange={(value) => updateDeviceAttribute('rowGap', value)}
						placeholder="e.g., 0.5em"
					/>
				</div>

				{/* Grid Auto Flow */}
				<TextControl
					label={__('Grid Auto Flow', 'axcelersblocks')}
					value={gridAutoFlow[activeDevice] || ''}
					onChange={(value) => updateDeviceAttribute('gridAutoFlow', value)}
					placeholder="e.g., row, column, dense"
				/>
				<div className='grid-colum-row'>
					{/* Grid Column */}
					<TextControl
						label={__('Grid Column', 'axcelersblocks')}
						value={gridColumn[activeDevice] || ''}
						onChange={(value) => updateDeviceAttribute('gridColumn', value)}
						placeholder="e.g., 1 / 3"
					/>

					{/* Grid Row */}
					<TextControl
						label={__('Grid Row', 'axcelersblocks')}
						value={gridRow[activeDevice] || ''}
						onChange={(value) => updateDeviceAttribute('gridRow', value)}
						placeholder="e.g., 1 / 2"
					/>
				</div>

				{/* Order */}
				<TextControl
					label={__('Order', 'axcelersblocks')}
					value={order[activeDevice] || ''}
					onChange={(value) => updateDeviceAttribute('order', value)}
					placeholder="e.g., 0, 1, -1"
				/>
			</div>
		</PanelBody>
  );
}
