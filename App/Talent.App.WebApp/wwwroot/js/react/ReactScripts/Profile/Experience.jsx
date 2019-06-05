/// <reference path="talentstatus.jsx" />
/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experiences: [],
            experience: [],
            showAddSection: false,
            showEditSection: false,
            showDeleteSection: false,

            data: {
                id: " ",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            }
        }
        this.loadData = this.loadData.bind(this)
        this.addExperience = this.addExperience.bind(this)
        this.updateExperience = this.updateExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
        this.handleAddSection = this.handleAddSection.bind(this)
        this.handleEditSection = this.handleEditSection.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveProfileData = this.saveProfileData.bind(this)
        this.updateProfileData = this.updateProfileData.bind(this)
        this.deleteProfileData = this.deleteProfileData.bind(this)

    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res.data)
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newExp = Object.assign([], this.state.experiences, newValues)
        this.setState({
            experiences: newExp
        })

    }

    closeEdit() {
        this.setState({
            showAddSection: false,
            showEditSection: false,
            data: {
                id: " ",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            }
        })


    }


    handleChange(event) {

        const data = Object.assign({}, this.state.data)
        data[event.target.name] = event.target.value
        this.setState({ data }, () => console.log(this.state))
    }
    saveProfileData() {

        this.setState({
            experience: this.state.data
        }, this.addExperience)

        this.closeEdit()
    }


    updateProfileData() {
        this.setState({
            experience: this.state.data
        }, this.updateExperience)
    }

    deleteProfileData(exp) {
        this.setState({
            experience: exp,
            experiences: []
        }, this.deleteExperience)
    }


    addExperience() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.experience),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not update successfully", "error", null, null)
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

    updateExperience() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.experience),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not update successfully", "error", null, null)
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

    deleteExperience() {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.experience),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not update successfully", "error", null, null)
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


    handleEditSection(exp) {

        this.setState({
            showEditSection: true,
            data: {
                id: exp.id,
                company: exp.company,
                position: exp.position,
                responsibilities: exp.responsibilities,
                start: moment(exp.start).format("YYYY-MM-DD"),
                end: moment(exp.end).format("YYYY-MM-DD"),
            }
        })

    }

    handleAddSection(event) {
        this.setState({
            showAddSection: true,
            data: { id: " " }

        })

    }




    render() {

        const { experiences } = this.state;
        const obj = (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <div >
                        {this.state.showAddSection ?

                            <div className='ui grid'>
                                <div className="ui four wide column">
                                    Company:
                                    <input
                                        type="text"
                                        value={this.state.data.company}
                                        onChange={this.handleChange}
                                        placeholder="Company"
                                        maxLength={40}
                                        name="company"
                                    />
                                </div>
                                <div className="ui four wide column">
                                    Position:
                                    <input
                                        type="text"
                                        value={this.state.data.position}
                                        onChange={this.handleChange}
                                        placeholder="Position"
                                        maxLength={40}
                                        name="position"
                                    />
                                </div>
                                <div className="ui four wide column">
                                    Responsibilities:
                                    <input
                                        type="text"
                                        value={this.state.data.responsibilities}
                                        onChange={this.handleChange}
                                        placeholder="Responsibilities"
                                        maxLength={40}
                                        name="responsibilities"
                                    />
                                </div>
                                <div className="ui four wide column">
                                    Start Date:
                                    <input
                                        type="date"
                                        value={this.state.data.start}
                                        onChange={this.handleChange}
                                        maxLength={40}
                                        name="start"
                                    />
                                </div>
                                <div className="ui four wide column">
                                    End Date:
                                    <input
                                        type="date"
                                        value={this.state.data.end}
                                        onChange={this.handleChange}
                                        maxLength={40}
                                        name="end"
                                    />
                                </div>
                                <div className="ui eight wide column">
                                    <button type="button" className="ui black button" onClick={this.saveProfileData}>Add</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                                </div>
                            </div>

                            : null
                        }

                        <table class="ui compact celled definition table">
                            <thead class="full-width">
                                <tr>
                                    <th>Company</th>
                                    <th>Position</th>
                                    <th>Responsibilities</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th><button type="button" className="ui right floated button" onClick={this.handleAddSection}>
                                        <i class="icon add"></i>
                                        Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.experiences ?
                                    <React.Fragment>
                                        {experiences.map(exp => {
                                            return (<tr key={exp.id}>
                                                {(this.state.showEditSection && (exp.id == this.state.data.id)) ?
                                                    <td colSpan="6">
                                                        <div className='ui grid'>
                                                            <div className="ui four wide column">
                                                                Company:
                                                                <input
                                                                    type="text"
                                                                    value={this.state.data.company}
                                                                    onChange={this.handleChange}
                                                                    placeholder="Company"
                                                                    maxLength={40}
                                                                    name="company"
                                                                />
                                                            </div>
                                                            <div className="ui four wide column">
                                                                Position:
                                                                <input
                                                                    type="text"
                                                                    value={this.state.data.position}
                                                                    onChange={this.handleChange}
                                                                    placeholder="Position"
                                                                    maxLength={40}
                                                                    name="position"
                                                                />
                                                            </div>
                                                            <div className="ui four wide column">
                                                                Responsibilities:
                                                                <input
                                                                    type="text"
                                                                    value={this.state.data.responsibilities}
                                                                    onChange={this.handleChange}
                                                                    placeholder="Responsibilities"
                                                                    maxLength={40}
                                                                    name="responsibilities"
                                                                />
                                                            </div>
                                                            <div className="ui four wide column">
                                                                Start Date:
                                                                <input
                                                                    type="date"
                                                                    value={this.state.data.start}
                                                                    onChange={this.handleChange}
                                                                    maxLength={40}
                                                                    name="start"
                                                                />
                                                            </div>
                                                            <div className="ui four wide column">
                                                                End Date:
                                                                <input
                                                                    type="date"
                                                                    value={this.state.data.end}
                                                                    onChange={this.handleChange}
                                                                    maxLength={40}
                                                                    name="end"
                                                                />
                                                            </div>
                                                            <div className="ui eight wide column">
                                                                <button type="button" className="ui blue button" onClick={this.updateProfileData}>Update</button>
                                                                <button type="button" className="ui red button" onClick={this.closeEdit}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    :
                                                    <React.Fragment>
                                                        <td>{exp.company}</td>
                                                        <td>{exp.position}</td>
                                                        <td>{exp.responsibilities}</td>
                                                        <td>{moment(exp.start).format("Do MMM YYYY")}</td>
                                                        <td>{moment(exp.end).format("Do MMM YYYY")}</td>
                                                        <td><button type="button" className="ui right floated button" onClick={() => this.handleEditSection(exp)}>
                                                            <i class="icon pencil"></i>
                                                        </button>
                                                            <button type="button" className="ui right floated button" onClick={() => this.deleteProfileData(exp)}>
                                                                <i class="icon delete"></i>
                                                            </button>
                                                        </td>
                                                    </React.Fragment>}
                                            </tr>)
                                        })}
                                    </React.Fragment> : null}
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>

        )
        return obj;
    }
}
