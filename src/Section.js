import React from "react";
import "./Section.css";

class Section extends React.Component {
    renderField(types, onFieldChange, onFieldDelete) {
        return (f, i) => {
            return <ul key={i}>
                {types.map((t) => {
                    var inp = (t === 'val') ?
                        <textarea cols={30} key={t} value={f[t]} onChange={(e) => onFieldChange(i, t, e.target.value)}></textarea> :
                        <input type="text" value={f[t]} onChange={(e) => onFieldChange(i, t, e.target.value)}/>
                    return <li key={t}>{t + ": "}{inp}{"\n"}</li>
                })}
                <button onClick={() => onFieldDelete(i)}>del</button>
            </ul>
        }
    }

    render() {
        const {name, pos, field_type, onNameChange, onSectionUp, onSectionDown, onDelete, onFieldChange, onFieldDelete, onFieldAdd} = this.props;

        var field_types = ['key', 'val'];
        if (field_type === 'language'){
            field_types = ['key', 'val', 'trn'];
        } else if (field_type === 'link'){
            field_types = ['key', 'link'];
        }

        var fields = this.props.fields.map(this.renderField(field_types, onFieldChange(pos), onFieldDelete(pos)));

        return <div className="section">
            <div>
                Name: <input type="text" value={name}
                    onChange={(e) => onNameChange(pos, e.target.value)} />
                <button onClick={() => onSectionUp(pos)}>up</button>
                <button onClick={() => onSectionDown(pos)}>down</button>
                <button onClick={() => onDelete(pos)}>delete</button>
            </div>
            <div>
                {fields}
                <button onClick={() => onFieldAdd(pos, field_types)}>add field</button>
            </div>
        </div>;
    }
}

export default Section;
