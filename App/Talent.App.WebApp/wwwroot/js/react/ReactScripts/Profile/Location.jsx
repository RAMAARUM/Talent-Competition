import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props);
        const address = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: " ",
                street: " ",
                suburb: " ",
                postcode: " ",
                city: " ",
                country: " "
            }



        this.state = {
            showEditSection: false,
            newaddressData: {
                address: address
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
        const address = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newaddressData: {
                address: address
            }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newaddressData.address)
        data[event.target.name] = event.target.value
        this.setState({
            newaddressData: { address: data }
        })
    }

    saveProfileData() {

        const data = Object.assign({}, this.state.newaddressData)
        this.props.updateProfileData(data)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {

        return (

            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        let countriesOptions = [];
        const selectedCountry = this.state.newaddressData.address.country;
        const selectedCity = this.state.newaddressData.address.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);


        }

        return (

            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="number"
                    label="Number"
                    name="number"
                    value={this.state.newaddressData.address.number}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your house number"
                    errorMessage="Please enter a number"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Street"
                    name="street"
                    value={this.state.newaddressData.address.street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Street"
                    errorMessage="Please enter Street"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={this.state.newaddressData.address.suburb}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your suburb"
                    errorMessage="Please enter a suburb"
                />

                <ChildSingleInput
                    inputType="number"
                    label="PostCode"
                    name="postcode"
                    value={this.state.newaddressData.address.postcode}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your postcode"
                    errorMessage="Please enter a postcode"
                />

                <div className="field">
                    <label>Country</label> <span><select className="ui right labeled dropdown"
                        placeholder="Country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="country"
                    >
                        <option value="">Select a country</option>
                        {countriesOptions}
                    </select></span>
                </div>

                <div className="field">
                    <label>City</label> <span><select
                        className="ui dropdown"
                        placeholder="City"
                        value={selectedCity}
                        onChange={this.handleChange}
                        name="city">
                        <option value="0"> Select a town or city</option>
                        {popCities}
                    </select><br /></span>
                </div>
                <button type="button" className="ui teal button" onClick={this.saveProfileData}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let number = this.props.addressData.number ? `${this.props.addressData.number}` : ""
        let street = this.props.addressData.street ? `${this.props.addressData.street}` : ""
        let suburb = this.props.addressData.suburb ? `${this.props.addressData.suburb}` : ""
        let postcode = this.props.addressData.postcode ? `${this.props.addressData.postcode}` : ""
        let city = this.props.addressData.city ? `${this.props.addressData.city}` : ""
        let country = this.props.addressData.country ? `${this.props.addressData.country}` : ""


        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {number} {street} {suburb} {postcode}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )

    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)




        this.state = {
            showEditSection: false,
            newnationalityData: {
                nationality: {}
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveProfileData = this.saveProfileData.bind(this)


    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            newnationalityData: {
                nationality: nextProps.nationalityData
            }
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newnationalityData)
        data[event.target.name] = event.target.value
        this.setState({
            newnationalityData: data
        }, this.saveProfileData)
    }

    saveProfileData() {

        const data = Object.assign({}, this.state.newnationalityData)
        this.props.saveProfileData(data)
    }


    render() {
        let countriesOptions = [];
        const selectedCountry = this.state.newnationalityData.nationality;
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        return (
            <div className='row'>
                <div className="ui four wide column">

                    <div >
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="nationality"
                        >
                            <option value="">Select your nationality</option>
                            {countriesOptions}
                        </select>

                    </div>

                </div>

            </div>
        )

    }
}