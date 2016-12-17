import React from "react";

class SectionList extends React.Component {
    constructor(props){
        super(props)
        this.state = {nextI: 1}
    }

    renderSection = (section, i) => <h3 key={section}>{section}</h3>

    newSection = () => {
        var {sheet} = this.props;
        if (!sheet.section_order) {
            sheet.section_order = ["section " + this.state.nextI];
        } else {
            sheet.section_order.push("section " + this.state.nextI);
        }
        this.setState({nextI: this.state.nextI + 1})
        this.props.onChange(JSON.stringify(sheet))
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
