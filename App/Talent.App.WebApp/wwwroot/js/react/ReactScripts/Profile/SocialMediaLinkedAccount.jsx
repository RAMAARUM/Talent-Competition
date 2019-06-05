/// <reference path="../form/formitemwrapper.jsx" />
/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }



        this.state = {
            showEditSection: false,
            newSocialMediaAccount: {
                linkedAccounts: linkedAccounts
            }
        }
    
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveProfileData = this.saveProfileData.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newSocialMediaAccount: {
                linkedAccounts: linkedAccounts
            }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newSocialMediaAccount.linkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newSocialMediaAccount: { linkedAccounts: data }
        })
    }

    saveProfileData() {
     
        const data = Object.assign({}, this.state.newSocialMediaAccount)
        this.props.updateProfileData(data)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }



    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="in LinkedIn"
                    name="linkedIn"
                    value={this.state.newSocialMediaAccount.linkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid Url"
                />

                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newSocialMediaAccount.linkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid Url"
                />

                <button type="button" className="ui teal button" onClick={this.saveProfileData}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let linkedIn = this.props.linkedAccounts ? `${this.props.linkedAccounts.linkedIn}` : ""
        let github = this.props.linkedAccounts ? `${this.props.linkedAccounts.github}` : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>

                        <a href={linkedIn} className="ui left floated blue button" target="_blank"> <i class="icon linkedin"></i>LinkedIn</a>

                        <a href={github} className="ui left floated black button" target="_blank"> <i class="icon github"></i>GitHub</a>

                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

