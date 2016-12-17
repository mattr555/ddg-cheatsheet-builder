import React from 'react';
import "./SheetText.css"

const SheetText = ({sheet, onChange}) => (
    <div>
        <textarea value={sheet} onChange={(e) => onChange(e.target.value)} rows={20} cols={40}/>
        <button onClick={() => onChange(JSON.stringify(JSON.parse(sheet), null, 2))}>Pretty Print</button>
    </div>
)

export default SheetText;
