import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function AddSchool() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));
        formData.append('image', data.image[0]);

        try {
            const response = await axios.post('/api/addSchool', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert(response.data.message);
        } catch (err) {
            console.error(err);
            alert('Error submitting the form');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-ternary">Add School</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-[4px_4px_5px_0px_rgba(0,_0,_0,_0.35)] space-y-4">
                <div>
                    <label className="block text-gray-700">School Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Enter school name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        {...register('address', { required: 'Address is required' })}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Enter school address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">City</label>
                    <input
                        type="text"
                        {...register('city', { required: 'City is required' })}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Enter city"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">State</label>
                    <input
                        type="text"
                        {...register('state', { required: 'State is required' })}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Enter state"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Contact</label>
                    <input
                        type="number"
                        {...register('contact', { required: 'Contact is required' })}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Enter contact number"
                    />
                    {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register('email_id', { required: 'Valid email is required' })}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                        placeholder="Enter email"
                    />
                    {errors.email_id && <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        {...register('image', { required: 'Image is required' })}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 p-3 bg-secondary text-white font-semibold rounded-md hover:bg-ternary hover:shadow-[4px_4px_8px_0px_rgba(0,_0,_0,_0.35)]"
                >
                    Add School
                </button>
            </form>
        </div>
    );
}
