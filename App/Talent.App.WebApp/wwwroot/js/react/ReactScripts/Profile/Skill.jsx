///<reference path="cvupload.jsx" />
/* Skill section */
import React from 'react';
import { Table, Input, Icon, Dropdown, Button } from 'semantic-ui-react';
import Cookies from 'js-cookie';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: [],
            skill: [],
            showAddSection: false,
            showEditSection: false,
            showDeleteSection: false,
            updateData: {
                id: " ",
                name: "",
                level: ""
            },

            data: {
                name: "",
                level: ""
            }
        }

        this.handleAddSection = this.handleAddSection.bind(this)
        this.handleEditSection = this.handleEditSection.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveProfileData = this.saveProfileData.bind(this)
        this.updateProfileData = this.updateProfileData.bind(this)
        this.deleteProfileData = this.deleteProfileData.bind(this)
        this.loadData = this.loadData.bind(this)
        // this.init = this.init.bind(this);
        this.addSkills = this.addSkills.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {

        let newSkill = Object.assign([], this.state.skills, newValues)
        this.setState({
            skills: newSkill
        })


    }


    closeEdit() {
        this.setState({
            showAddSection: false,
            showEditSection: false,
            data: {
                name: "",
                level: ""
            },
            updateData: {
                id: "",
                name: "",
                level: ""
            }
        })

    }


    handleChange(event) {

        if (this.state.updateData.id !== " ") {

            const updateData = Object.assign({}, this.state.updateData)
            updateData[event.target.name] = event.target.value
            this.setState({ updateData }, () => console.log(this.state))

        }
        else {
            const data = Object.assign({}, this.state.data)
            data[event.target.name] = event.target.value
            this.setState({ data }, () => console.log(this.state))

        }
    }
    saveProfileData() {
        this.setState({
            skill: this.state.data
        }, this.addSkills)

        this.closeEdit()
    }

    updateProfileData() {

        this.setState({
            skill: this.state.updateData
        }, this.updateSkill)
    }

    deleteProfileData(skill) {

        this.setState({
            skill: skill,
            skills: []
        }, this.deleteSkill)
    }

    addSkills() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeEdit()
    }


    updateSkill() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeEdit()
    }

    deleteSkill() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.skill),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res.success + "errormess")
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeEdit()
    }

    handleEditSection(skill) {

        this.setState({
            showEditSection: true,
            updateData: {
                id: skill.id,
                name: skill.name,
                level: skill.level
            }
        })

    }


    handleAddSection(event) {
        this.setState({
            showAddSection: true,
            updateData: { id: " " }

        })

    }




    render() {
        const { skills } = this.state;
        const obj = (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div >
                        {this.state.showAddSection ?

                            <div className='ui grid'>
                                <div className="ui four wide column">
                                    <input
                                        type="text"
                                        value={this.state.data.name}
                                        onChange={this.handleChange}
                                        placeholder="Add Skill"
                                        maxLength={40}
                                        name="name"
                                    />
                                </div>
                                <div className="ui four wide column">
                                    <select className="ui right labeled dropdown"
                                        placeholder="Skill Level"
                                        value={this.state.data.level}
                                        onChange={this.handleChange}
                                        name="level"
                                    >
                                        <option value="">Skill Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                                <div className="ui eight wide column">
                                    <button type="button" className="ui black button" onClick={this.saveProfileData}>Add</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                                </div>
                            </div>

                            : null
                        }
                        <table class="ui compact definition table">
                            <thead class="full-width">
                                <tr>
                                    <th>Skill</th>
                                    <th>Level</th>
                                    <th><button type="button" className="ui right floated button" onClick={this.handleAddSection}>
                                        <i class="icon add"></i>
                                        Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills.map(skill => {
                                    return (<tr key={skill.id}>
                                        {(this.state.showEditSection && (skill.id == this.state.updateData.id)) ?
                                            <td><input
                                                type="text"
                                                value={this.state.updateData.name}
                                                onChange={this.handleChange}
                                                placeholder="Add Skill"
                                                maxLength={80}
                                                name="name"
                                            /></td> : <td>{skill.name}</td>}
                                        {(this.state.showEditSection && (skill.id == this.state.updateData.id)) ?
                                            <td><select className="ui right labeled dropdown"
                                                placeholder="Skill Level"
                                                value={this.state.updateData.level}
                                                onChange={this.handleChange}
                                                name="level"
                                            >
                                                <option value="">Skill Level</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Expert">Expert</option>
                                            </select></td> : <td>{skill.level}</td>}
                                        {(this.state.showEditSection && (skill.id == this.state.updateData.id)) ?
                                            <React.Fragment>
                                                <td><button type="button" className="ui blue button" onClick={this.updateProfileData}>Update</button> </td>
                                                <td> <button type="button" className="ui red button" onClick={this.closeEdit}>Cancel</button></td>
                                            </React.Fragment>
                                            :
                                            <td><button type="button" className="ui right floated button" onClick={() => this.handleEditSection(skill)}>
                                                <i class="icon pencil"></i>
                                            </button>
                                                <button type="button" className="ui right floated button" onClick={() => this.deleteProfileData(skill)}>
                                                    <i class="icon delete"></i>
                                                </button>
                                            </td>

                                        }
                                    </tr>)
                                })}
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>

        )
        return obj;
    }
}

