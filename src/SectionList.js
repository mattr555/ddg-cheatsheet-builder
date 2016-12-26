import React from "react";
import Section from "./Section";

class SectionList extends React.Component {
    constructor(props){
        super(props)
        this.state = {nextI: 1}
    }

    newSection = () => {
        var {sheet} = this.props;
        var name = "section " + this.state.nextI;
        if (!sheet.section_order) {
            sheet.section_order = [name];
            sheet.sections = {[name]: []};
        } else {
            sheet.section_order.push(name);
            sheet.sections[name] = [];
        }
        this.setState({nextI: this.state.nextI + 1})
        this.props.onChange(JSON.stringify(sheet))
    }

    changeSectionName = (pos, newName) => {
        var {sheet} = this.props;
        const oldName = sheet.section_order[pos];
        sheet.section_order[pos] = newName;
        sheet.sections[newName] = sheet.sections[oldName];
        delete sheet.sections[oldName];
        this.props.onChange(JSON.stringify(sheet));
    }

    sectionUp = (pos) => {
        var {sheet} = this.props;
        if (pos > 0) {
            const toMove = sheet.section_order.splice(pos, 1)[0];
            sheet.section_order = sheet.section_order.slice(0, pos-1).concat(
                Array.of(toMove).concat(sheet.section_order.slice(pos-1))
            )
        }
        this.props.onChange(JSON.stringify(sheet))
    }

    sectionDown = (pos) => {
        var {sheet} = this.props;
        if (pos < sheet.section_order.length - 1) {
            const toMove = sheet.section_order.splice(pos, 1)[0];
            sheet.section_order = sheet.section_order.slice(0, pos+1).concat(
                Array.of(toMove).concat(sheet.section_order.slice(pos+1))
            )
        }
        this.props.onChange(JSON.stringify(sheet))
    }

    sectionDelete = (pos) => {
        var {sheet} = this.props;
        delete sheet.sections[sheet.section_order[pos]];
        sheet.section_order.splice(pos, 1);
        this.props.onChange(JSON.stringify(sheet))
    }

    fieldChange = (pos) => (fieldPos, field, newValue) => {
        var {sheet} = this.props;
        sheet.sections[sheet.section_order[pos]][fieldPos][field] = newValue;
        this.props.onChange(JSON.stringify(sheet))
    }

    fieldDelete = (pos) => (fieldPos) => {
        var {sheet} = this.props;
        sheet.sections[sheet.section_order[pos]].splice(fieldPos, 1);
        this.props.onChange(JSON.stringify(sheet))
    }

    fieldAdd = (pos, fields) => {
        var {sheet} = this.props;
        var newFields = {}
        fields.forEach((f) => newFields[f] = '');
        sheet.sections[sheet.section_order[pos]].push(newFields)
        this.props.onChange(JSON.stringify(sheet))
    }

    renderSection = (section, i) => {
        const {sheet} = this.props;
        return <Section
            name={section}
            pos={i}
            fields={sheet.sections[section]}
            field_type={sheet.template_type}
            onNameChange={this.changeSectionName}
            onSectionUp={this.sectionUp}
            onSectionDown={this.sectionDown}
            onDelete={this.sectionDelete}
            onFieldChange={this.fieldChange}
            onFieldDelete={this.fieldDelete}
            onFieldAdd={this.fieldAdd}
            key={i}
            />
    }

    render(){
        const {sheet} = this.props;
        const sections = sheet.section_order ? sheet.section_order.map(this.renderSection) : [];
        return <div>
            {sections}
            <button onClick={this.newSection}>New Section</button>
        </div>
    }
}

export default SectionList;
