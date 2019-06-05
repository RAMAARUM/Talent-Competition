import React from 'react'
import moment from 'moment';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visa: {
                visaStatus: "",
                visaExpiryDate: ""
            },
            showDateSection: false,
            name: " "
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveProfileData = this.saveProfileData.bind(this)
        this.setVisaStatus = this.setVisaStatus.bind(this)

    }


    componentWillReceiveProps(nextProps) {
        //this is called to before render method

        this.setState({
            visa: {
                visaStatus: nextProps.visaStatus,
                visaExpiryDate: nextProps.visaExpiryDate
            }
        })
        if (nextProps.visaExpiryDate != "") {
            this.setState({
                showDateSection: true,
                visa: {
                    visaStatus: nextProps.visaStatus,
                    visaExpiryDate: moment(nextProps.visaExpiryDate).format("YYYY-MM-DD")

                }

            })
        }
    }


    handleChange(event) {
        const data = Object.assign({}, this.state.visa)
        data[event.target.name] = event.target.value
        this.setState({
            visa: data,
            name: event.target.name
        }, () => this.setVisaStatus(this.state.visa.visaStatus, this.state.name))
    }

    saveProfileData() {

        const data = Object.assign({}, this.state.visa)
        this.props.saveProfileData(data)
        this.props.updateProfileData(data)
    }

    setVisaStatus(value, name) {

        if ((value == "Work Visa" || value == "Student Visa") && (name == 'visaStatus')) {
            this.setState({
                showDateSection: true
            }, () => this.saveProfileData())
        }
        if ((value == "Citizen" || value == "Permanent Resident") && (name == 'visaStatus')) {
            this.setState({
                showDateSection: false,
                visa: {
                    visaStatus: value,
                    visaExpiryDate: ""
                }
            }, () => this.saveProfileData())
        }
    }


    render() {

        return (

            <div className='row'>
                <div className="ui sixteen wide column">
                    <div className='ui grid'>
                        <div className="ui four wide column">

                            <select className="ui right labeled dropdown"
                                label="Visa type"
                                placeholder="Enter Visa Type"
                                value={this.state.visa.visaStatus}
                                onChange={this.handleChange}
                                name="visaStatus"
                            >
                                <option value="">Visa Types</option>
                                <option value="Citizen">Citizen</option>
                                <option value="Permanent Resident">Permanent Resident</option>
                                <option value="Work Visa">Work Visa</option>
                                <option value="Student Visa">Student Visa</option>
                            </select>

                        </div>
                        {this.state.showDateSection ?
                            <React.Fragment>
                                <div className="ui four wide column">
                                    <SingleInput
                                        inputType="date"
                                        label="Visa Expiry Date"
                                        name="visaExpiryDate"
                                        content={this.state.visa.visaExpiryDate}
                                        controlFunc={this.handleChange}
                                        placeholder="Enter Visa Expiry Date"
                                        errorMessage="Please enter a valid date"
                                    />
                                </div>
                                <div className="ui four wide column">
                                    <button type="button" className="ui black button" onClick={this.saveProfileData}>Save</button>

                                </div>
                            </React.Fragment>
                            :
                            null


                        }



                    </div>
                </div>

            </div>
        )

    }
}