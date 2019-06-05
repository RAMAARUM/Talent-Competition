/* Language section */
import React from 'react';
import Cookies from 'js-cookie';

export default class Language extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            languages: [],
            language: [],
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
        this.addLanguages = this.addLanguages.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
    }


    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguage',
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

        let newLang = Object.assign([], this.state.languages, newValues)
        this.setState({
            languages: newLang
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
            language: this.state.data
        }, this.addLanguages)

        this.closeEdit()
    }

    updateProfileData() {

        this.setState({
            language: this.state.updateData
        }, this.updateLanguage)
    }

    deleteProfileData(lang) {

        this.setState({
            language: lang,
            languages: []
        }, this.deleteLanguage)
    }

    addLanguages() {


        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.language),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
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


    updateLanguage() {


        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.language),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
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

    deleteLanguage() {


        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.language),
            success: function (res) {
                console.log(res, res.success + "successmess")
                if (res.success == true) {
                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    console.log("going to load data")
                    this.loadData()
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
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

    handleEditSection(lang) {

        this.setState({
            showEditSection: true,
            updateData: {
                id: lang.id,
                name: lang.name,
                level: lang.level
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
        const { languages } = this.state;

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
                                        placeholder="Add Language"
                                        maxLength={40}
                                        name="name"
                                    />
                                </div>
                                <div className="ui four wide column">
                                    <select className="ui right labeled dropdown"
                                        placeholder="Language Level"
                                        value={this.state.data.level}
                                        onChange={this.handleChange}
                                        name="level"
                                    >
                                        <option value="">Language Level</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">Conversational Level</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native/Bilingual">Native/Bilingual</option>
                                    </select>
                                </div>
                                <div className="ui eight wide column">
                                    <button type="button" className="ui black button" onClick={this.saveProfileData}>Add</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                                </div>
                            </div>

                            : null
                        }
                        <table class="ui compact  definition table">
                            <thead class="full-width">
                                <tr>
                                    <th>Language</th>
                                    <th>Level</th>
                                    <th><button type="button" className="ui right floated button" onClick={this.handleAddSection}>
                                        <i class="icon add"></i>
                                        Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {languages.map(lang => {
                                    return (<tr key={lang.id}>
                                        {(this.state.showEditSection && (lang.id == this.state.updateData.id)) ?
                                            <td><input
                                                type="text"
                                                value={this.state.updateData.name}
                                                onChange={this.handleChange}
                                                placeholder="Add Language"
                                                maxLength={80}
                                                name="name"
                                            /></td> : <td>{lang.name}</td>}
                                        {(this.state.showEditSection && (lang.id == this.state.updateData.id)) ?
                                            <td><select className="ui right labeled dropdown"
                                                placeholder="Language Level"
                                                value={this.state.updateData.level}
                                                onChange={this.handleChange}
                                                name="level"
                                            >
                                                <option value="">Language Level</option>
                                                <option value="Basic">Basic</option>
                                                <option value="Conversational">Conversational Level</option>
                                                <option value="Fluent">Fluent</option>
                                                <option value="Native/Bilingual">Native/Bilingual</option>
                                            </select></td> : <td>{lang.level}</td>}
                                        {(this.state.showEditSection && (lang.id == this.state.updateData.id)) ?
                                            <React.Fragment>
                                                <td><button type="button" className="ui blue button" onClick={this.updateProfileData}>Update</button> </td>
                                                <td> <button type="button" className="ui red button" onClick={this.closeEdit}>Cancel</button></td>
                                            </React.Fragment>
                                            :
                                            <td><button type="button" className="ui right floated button" onClick={() => this.handleEditSection(lang)}>
                                                <i class="icon pencil"></i>
                                            </button>
                                                <button type="button" className="ui right floated button" onClick={() => this.deleteProfileData(lang)}>
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