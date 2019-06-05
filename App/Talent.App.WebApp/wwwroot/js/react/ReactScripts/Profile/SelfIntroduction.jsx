/// <reference path="images.jsx" />
/// <reference path="talentstatus.jsx" />
/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showEditSection: false,
            newSelfIntro: {
                summary: " ",
                description: " "
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.updateProfileData = this.updateProfileData.bind(this)
    };


    componentWillReceiveProps(nextProps) {
        //this is called to before render method

        this.setState({
            newSelfIntro: {
                summary: nextProps.summary,
                description: nextProps.description
            }
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newSelfIntro)
        data[event.target.name] = event.target.value
        this.setState({
            newSelfIntro: data
        })
    }

    updateProfileData() {
        const data = Object.assign({}, this.state.newSelfIntro)
        this.props.updateProfileData(data)
        this.props.updateWithoutSave(data)
    }




    render() {
        return (
            <form className="ui row form">

                <div className="ui four wide column">
                    <h3>Description</h3>
                </div>
                <div className="ui row twelve wide column">
                    <div className='ui container'>
                        <div className='row'>
                            <div className="ui row sixteen wide column">

                                <React.Fragment>
                                    <div class="field">
                                        <textarea
                                            name="summary"
                                            value={this.state.newSelfIntro.summary}
                                            onChange={this.handleChange}
                                            placeholder="Please provide short summary about yourselves." rows="2">
                                        </textarea>
                                        <div className='row'>
                                            <label><strong>Summary must be no more than 150 characters.</strong></label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <textarea
                                            name="description"
                                            value={this.state.newSelfIntro.description}
                                            onChange={this.handleChange}
                                            placeholder="Please tell us about any hobbies, additional expertise or anything else you'd like to add.">
                                        </textarea>
                                        <div className='row'>
                                            <label><strong>Description must be between 150-600 characters.</strong></label>
                                        </div>
                                        <button type="button" className="ui right floated teal button" onClick={this.updateProfileData}>Save</button>
                                    </div>
                                    
                                        
                                   
                                </React.Fragment>
                                
                            </div>


                        </div>
                    </div>


                </div>

            </form >
        )
    }
}



