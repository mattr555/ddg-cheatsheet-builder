import React from 'react';
import "./SheetText.css"

const SheetText = ({sheet, onChange}) => (
    <div>
        <textarea value={JSON.stringify(JSON.parse(sheet), null, 2)} onChange={(e) => onChange(e.target.value)} rows={20} cols={40}/>
    </div>
)

export default SheetText;
