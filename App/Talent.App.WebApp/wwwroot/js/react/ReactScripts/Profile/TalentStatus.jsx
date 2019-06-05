import React from 'react'
import { Form, Checkbox, Radio} from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            jobSeekingStatus: {
                status: this.props.status,
                availableDate: null
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.updateProfileData = this.updateProfileData.bind(this)
       
    }

    componentWillReceiveProps(nextProps) { 
        this.setState({ jobSeekingStatus: nextProps.status })
    }

    handleChange(e, { value }) {
        this.setState({
            jobSeekingStatus: {
                status: value
            }

        }, this.updateProfileData);

        
    }


    updateProfileData() {
        
        const data = Object.assign({}, this.state.jobSeekingStatus)
        this.props.updateProfileData({ jobSeekingStatus: data })
        this.props.saveProfileData({ jobSeekingStatus: data })
    }



    
    render() {
        return (
            <Form>
                <Form.Field>
                    <strong>Current Status</strong>
                    <b>{this.state.value}</b>
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Actively looking for a job'
                        name='radioGroup'
                        value='Actively looking for a job'
                        checked={this.state.jobSeekingStatus.status === 'Actively looking for a job' }
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Not looking for a job at the moment'
                        name='radioGroup'
                        value='Not looking for a job at the moment'
                        checked={this.state.jobSeekingStatus.status === 'Not looking for a job at the moment'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Currently employed but open to offers'
                        name='radioGroup'
                        value='Currently employed but open to offers'
                        checked={this.state.jobSeekingStatus.status === 'Currently employed but open to offers'}
                        onChange={this.handleChange}
                    />
                </Form.Field>                
                <Form.Field>
                    <Radio
                        label='Will be available on later date'
                        name='radioGroup'
                        value='Will be available on later date'
                        checked={this.state.jobSeekingStatus.status === 'Will be available on later date'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>
            
            )
    }
}