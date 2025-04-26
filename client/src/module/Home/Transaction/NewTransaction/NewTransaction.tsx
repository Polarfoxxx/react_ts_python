import React from 'react';
import { create_Transaction, Transaction_model } from '../../../API';
import './newTransaction_style.css';
import Content_app from '../../../../App';

function NewTransaction(): JSX.Element {
    const main_Context = React.useContext(Content_app.mainContext);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //! Prevent the default form submit
        const form = e.currentTarget;   //! Get the form element
        const formData = new FormData(form); //! Create a new FormData object    
        const data = Object.fromEntries(formData); //! Convert formData to an object
        const new_data: Transaction_model = {
            type_trns: data.type_trns as "deduction" | "addition",
            value_trns: Number(data.value_trns),
            name_event: data.name_trns as string,
            create_time: data.create_time as string,
        };

        create_Transaction(new_data).then((response) => {
            main_Context.setMainData(response.Alltransaction); //! Update the main context with the new data
        })
    }


    return (
        <div className='new_transaction'>
            <div className='new_transaction_header'>
                <h1>
                    New transacton
                </h1>
            </div>
            <div className='new_transaction_form'>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className='new_transaction_data_one'>
                        <div>
                        <select
                                defaultValue=""
                                name="type_trns"
                                aria-label="Choose an option">
                                <option value="" disabled hidden>Select a category</option>
                                <option value="addition">addition</option>
                                <option value="deduction">deduction</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="value">Value</label>
                            <input type="text" name="value_trns" id="value" />
                        </div>
                    </div>
                    <div className='new_transaction_data_two'>
                        <div>
                            <select
                                defaultValue=""
                                name="name_trns"
                                aria-label="Choose an option">
                                <option value="" disabled hidden>Select a category</option>
                                <option value="health">Health</option>
                                <option value="work">Work</option>
                                <option value="family">Family</option>
                                <option value="hobbies">Hobbies</option>
                                <option value="free_time">Free Time</option>
                                <option value="education">Education</option>
                                <option value="friends">Friends</option>
                                <option value="travel">Travel</option>
                                <option value="sports">Sports</option>
                                <option value="food">Food</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="personal_growth">Personal Growth</option>
                                <option value="finance">Finance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="create_time">Create time</label>
                            <input type="create_time" name="create_time" id="create_time" />
                        </div>
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className='new_transaction_footer'>
                <h1>
                    Footer
                </h1>
            </div>
        </div>
    )
}

export default NewTransaction;