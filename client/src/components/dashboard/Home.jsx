import React from 'react';

const Home = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { title: 'Total Users', value: 150 },
                    { title: 'Total Roles', value: 5 },
                    { title: 'Total Permissions', value: 20 },
                ].map(stat => (
                    <div key={stat.title} className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{stat.title}</h2>
                        <p className="text-2xl">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
