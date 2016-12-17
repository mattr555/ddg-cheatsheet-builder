import React from 'react';
import SectionList from "./SectionList";

class SheetEditor extends React.Component {
    onChange = (e, outer=null) => {
        const key = e.target.name;
        const value = e.target.value;
        var sheet = JSON.parse(this.props.sheet);
        if (outer){
            if (!sheet[outer]) sheet[outer] = {};
            sheet[outer][key] = value;
        } else {
            sheet[key] = value;
        }
        this.props.onChange(JSON.stringify(sheet));
    }

    onAliasChange = (e) => {
        var sheet = JSON.parse(this.props.sheet);
        sheet["aliases"] = e.target.value.split(',');
        this.props.onChange(JSON.stringify(sheet));
    }

    render() {
        const sheet = JSON.parse(this.props.sheet);

        return <div>
            <div>
                Unique ID (required): <input type="text" name="id" value={sheet.id} onChange={this.onChange}></input>
            </div>
            <div>
                Name (required): <input type="text" name="name" value={sheet.name} onChange={this.onChange}></input>
            </div>
            <div>
                Description: <input type="text" name="description" value={sheet.description} onChange={this.onChange}></input>
            </div>
            <div>
                Source Name (required): <input type="text" name="sourceName" value={sheet.metadata && sheet.metadata.sourceName} onChange={(e) => this.onChange(e, "metadata")}></input>
            </div>
            <div>
                Source URL (required): <input type="text" name="sourceUrl" value={sheet.metadata && sheet.metadata.sourceUrl} onChange={(e) => this.onChange(e, "metadata")}></input>
            </div>
            <div>
                Aliases: <input type="text" value={sheet.aliases && sheet.aliases.join(',')} onChange={this.onAliasChange}></input>
            </div>
            <div>
                Template Type (required): <select name="template_type" value={sheet.template_type} onChange={this.onChange}>
                    <option value="">-</option>
                    <option>keyboard</option>
                    <option>terminal</option>
                    <option>code</option>
                    <option>reference</option>
                    <option>language</option>
                    <option>link</option>
                </select>
            </div>
            <SectionList sheet={sheet} onChange={this.props.onChange}/>
        </div>;
    }
}

export default SheetEditor;
