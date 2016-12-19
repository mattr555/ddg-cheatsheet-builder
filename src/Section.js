import React from "react";
import "./Section.css";

class Section extends React.Component {
    renderField(f, i){
        return <li id={f.key}>{f.key}: {f.val}</li>
    }

    render() {
        const {name, pos, onNameChange, onSectionUp, onSectionDown, onDelete} = this.props;
        var fields = this.props.fields.map(this.renderField);
        return <div className="section">
            <div>
                Name: <input type="text" value={name}
                    onChange={(e) => onNameChange(pos, e.target.value)}/>
                <button onClick={() => onSectionUp(pos)}>up</button>
                <button onClick={() => onSectionDown(pos)}>down</button>
                <button onClick={() => onDelete(pos)}>delete</button>
            </div>
            <div>
                <ul>
                    {fields}
                </ul>
            </div>
        </div>;
    }
}

export default Section;
