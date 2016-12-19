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

    renderSection = (section, i) => {
        const {sheet} = this.props;
        return <Section
            name={section}
            pos={i}
            fields={sheet.sections[section]}
            onNameChange={this.changeSectionName}
            onSectionUp={this.sectionUp}
            onSectionDown={this.sectionDown}
            onDelete={this.sectionDelete}
            key={section}
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
