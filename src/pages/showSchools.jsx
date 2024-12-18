import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        axios.get('/api/getSchools')
            .then((res) => setSchools(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6 text-ternary">Schools List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school, index) => (
                    <div
                        className="bg-white rounded-lg shadow-[4px_4px_5px_0px_rgba(0,_0,_0,_0.35)] p-4 text-center transition-transform transform hover:rotate-1 hover:scale-105 hover:shadow-[4px_4px_5px_0px_rgba(0,_0,_0,_0.35)] hover:scale-120"
                        key={index}
                    >
                        <img
                            src={school.image}
                            alt={school.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-xl font-semibold text-ternary">{school.name}</h3>
                        <p className="text-gray-700">{school.address}, {school.city}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
