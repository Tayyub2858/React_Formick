import React, { useState } from 'react'
import FromickData from './FormickArray';
import { useFormik } from 'formik';

function Formick() {
    const [appliedTo, setAppliedTo] = useState('');

    const formik = useFormik({
        initialValues: {
            // Define your form fields here based on the design
        },
        onSubmit: values => {
            console.log('Form values:', values);
            // Handle form submission logic here
        },
    });
    const handleApplyToItems = (appliedType) => {
        setAppliedTo(appliedType);
        console.log(`Applied to ${appliedType} items`);
        // Implement logic for applying to all or some items
    };
    return (
        <form onSubmit={formik.handleSubmit}>
            {/* Display items from the API response */}
            {FromickData.map(item => (
                <div key={item.id}>
                    {/* Render items based on your design */}
                    {/* Use formik.handleChange for checkboxes */}
                    <label>
                        <input
                            type="checkbox"
                            name={`item_${item.id}`}
                            checked={formik.values[`item_${item.id}`]}
                            onChange={formik.handleChange}
                        />
                        {item.name}
                    </label>

                    {/* Display category checkbox with grey background */}
                    {item.category && (
                        <div style={{ backgroundColor: '#ddd', paddingLeft: '20px' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={`category_${item.category.id}`}
                                    checked={formik.values[`category_${item.category.id}`]}
                                    onChange={formik.handleChange}
                                />
                                {item.category.name}
                            </label>
                        </div>
                    )}
                </div>
            ))}

            {/* "Apply to x items" buttons */}
            <button
                type="button"
                onClick={() => handleApplyToItems('all')}
            >
                Apply to All Items
            </button>
            <button
                type="button"
                onClick={() => handleApplyToItems('some')}
            >
                Apply to Some Items
            </button>

            <button type="submit">Submit</button>
        </form>
    )
}

export default Formick
