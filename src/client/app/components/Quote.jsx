import React from 'react';
import TextField from './TextField.jsx';
import DropDown from './DropDown.jsx';
import FormContainer from './FormContainer.jsx';
import Button from './Button.jsx';
import Request from '../lib/Connect.jsx';

class Quote extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            quoteReady: false,
            gettingQuote: false
        }
    }
    render () {
        var genderData = ['Male', 'Female'];
        var yourQuote = []
        if (this.state.quoteReady) {
            yourQuote = (<div className="quote-info">
                Your Quote: {this.state.quote}
            </div>)
        }

        if (this.state.gettingQuote) {
            yourQuote = (<div className="quote-info">
                Getting Quote...
            </div>)
        }
        return (
            <div>
                <FormContainer>
                    
                    <table><tbody><tr><td>
                        <div className="fieldset">
                            <TextField ref="dob" fieldLabel="Date of Birth" labelWidth="140" width="400" />
                            <DropDown ref="gender" fieldLabel="Gender" labelWidth="140" comboProps={{data: genderData, defaultValue: "Select an option..."}} width="402"/>
                            <TextField ref="income" fieldLabel="Annual Income" labelWidth="140" width="400" />
                            <Button onClick={this.onClick.bind(this)} style={{float: 'right'}} btnType="style4">Get Quote</Button>
                            <div style={{clear: 'both'}}/>
                        </div>
                        {yourQuote}
                    </td></tr></tbody></table>
                </FormContainer>

            </div>
        )
    }

    onClick () {
        var dob = this.refs.dob.getValue();
        var gender = this.refs.gender.getValue();
        var income = this.refs.income.getValue();
        var me = this;
        this.setState({
            quoteReady: false,
            gettingQuote: true
        })
        Request({
            url: "get_quotes",
            params: {
                dob: dob,
                gender: gender,
                income: income
            },
            success: function (response) {
                setTimeout(function () {
                    me.setState({
                        quoteReady: true,
                        gettingQuote: false,
                        quote: response.data.data.quote
                    });
                }, 3000);
            },
            error: function (error) {

            }
        })
    }
}

module.exports = Quote;