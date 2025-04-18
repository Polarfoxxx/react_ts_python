import React from 'react';
import { create_Transaction, Type_for_new_transaction } from '../../../API';
import './newTransaction_style.css';
import Content_app from '../../../../App';

function NewTransaction(): JSX.Element {
    const main_Context = React.useContext(Content_app.mainContext);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //! Prevent the default form submit
        const form = e.currentTarget;   //! Get the form element
        const formData = new FormData(form); //! Create a new FormData object    
        const data = Object.fromEntries(formData); //! Convert formData to an object
        const new_data: Type_for_new_transaction = {
            type_trns: data.type_trns as string,
            value_trns: Number(data.value_trns),
            name_event: data.name_event as string,
            create_time: data.create_time as string,
        };

        create_Transaction(new_data).then((response) => {
            main_Context.setMainData(response.Alltransaction); //! Update the main context with the new data
        })
    }


    return (
        <div className='new_transaction'>
            <div>
                <h1>
                    New transacton
                </h1>
            </div>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label htmlFor="type">Type</label>
                        <input type="text" name="type_trns" id="type" />
                    </div>
                    <div>
                        <label htmlFor="value">Value</label>
                        <input type="text" name="value_trns" id="value" />
                    </div>
                    <div>
                        <select
                            defaultValue=""
                            className="w-[400px] h-[30px] text-[14px] ml-3 placeholder:text-slate-300 bg-transparent pl-3 pr-3 text-center border-b-2 border-thems-inputBorder focus:outline-none focus:border-red-500"
                            name="name_event"
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
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div>

            </div>
        </div>
    )
}

export default NewTransaction;